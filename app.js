import * as S from './spotify.js';
import * as Q from './qr.js';
import { PLAYLISTS, allSongs, songKey } from './data.js';

// ================= Utilidades =================
const $ = (sel, el = document) => el.querySelector(sel);
const app = $('#app');
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const shuffle = a => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const buzz = ms => { try { navigator.vibrate?.(ms); } catch {} };
const load = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } };
const save = (k, v) => localStorage.setItem(k, JSON.stringify(v));
const MIN_YEAR = 1950, MAX_YEAR = new Date().getFullYear();

const DECADE_COLORS = ['#5CE1FF', '#FFE04A', '#FF4FA0', '#38F2AE', '#A98BFF', '#FF9A3D', '#7FA2FF', '#F6F7FF'];
const cardColor = y => DECADE_COLORS[Math.max(0, Math.floor((y - 1950) / 10)) % DECADE_COLORS.length];

let toastTimer;
function toast(msg) {
  const t = $('#toast');
  t.textContent = msg; t.classList.add('show');
  clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove('show'), 3200);
}

function modal(html, { onMount, dismissable = true } = {}) {
  const root = $('#modal-root');
  root.innerHTML = `<div class="sheet-backdrop"><div class="sheet" role="dialog" aria-modal="true">${html}</div></div>`;
  const close = () => { root.innerHTML = ''; };
  if (dismissable) root.querySelector('.sheet-backdrop').addEventListener('click', e => { if (e.target.classList.contains('sheet-backdrop')) close(); });
  root.querySelectorAll('[data-close]').forEach(b => b.addEventListener('click', close));
  onMount?.(root.querySelector('.sheet'), close);
  return close;
}

const STYLES = [
  { id: 'todos', name: 'Todos los tiempos', hint: 'De Elvis a Bad Bunny' },
  { id: 'los40', name: 'Los 40 Principales', hint: 'Números uno de la radio' },
  { id: 'verano', name: 'Hits del verano', hint: 'Chiringuito y canción del verano' },
  { id: 'reggaeton', name: 'Reguetón', hint: 'Del perreo clásico a hoy' },
  { id: 'epoca', name: 'Selecciona época', hint: 'Cada jugador elige sus años' },
];

// ================= Estado =================
let setup = load('hz.setup', { count: 2, names: [], style: 'todos', mode: 'app', target: 10, eras: [] });
let game = load('hz.game', null);
let screen = 'home';
let profileName = load('hz.profile', null);

const saveSetup = () => save('hz.setup', setup);
const saveGame = () => save('hz.game', game);
const cur = () => game.players[game.current];
const playerName = i => setup.names[i]?.trim() || `Jugador ${i + 1}`;

function go(s) { screen = s; Q.stopScanner(); render(); window.scrollTo(0, 0); }

function render() {
  ({ home: renderHome, eras: renderEras, settings: renderSettings, pass: renderPass, turn: renderTurn, win: renderWin })[screen]();
}

// ================= Mazo =================
function erasPool(eras) {
  const all = allSongs();
  return eras.map(e => shuffle(all.filter(s => s.year >= Math.min(e.from, e.to) && s.year <= Math.max(e.from, e.to))));
}

function buildDeck() {
  if (setup.style !== 'epoca') return shuffle(PLAYLISTS[setup.style].songs);
  // Una lista por jugador; se van alternando para que todas las épocas salgan por igual
  const pools = erasPool(setup.eras.slice(0, setup.count));
  const deck = [], seen = new Set();
  let added = true;
  while (added) {
    added = false;
    for (const p of pools) {
      while (p.length) {
        const s = p.shift();
        if (!seen.has(songKey(s))) { seen.add(songKey(s)); deck.push(s); added = true; break; }
      }
    }
  }
  return deck;
}

function drawSong() {
  const owned = new Set(game.players.flatMap(p => p.cards.map(songKey)));
  for (let pass = 0; pass < 2; pass++) {
    while (game.deckIdx < game.deck.length) {
      const s = game.deck[game.deckIdx++];
      if (!owned.has(songKey(s)) && !game.skipped.includes(songKey(s))) return s;
    }
    toast('Se han acabado las canciones. Barajo de nuevo las que quedan.');
    game.deck = shuffle(game.deck); game.deckIdx = 0; game.skipped = [];
  }
  return null;
}

// ================= Partida =================
function startGame() {
  const deck = buildDeck();
  if (deck.length < setup.count + 5) { toast('Hay muy pocas canciones para esta selección. Amplía las épocas.'); return; }
  game = {
    players: Array.from({ length: setup.count }, (_, i) => ({ name: playerName(i), cards: [], tokens: 0 })),
    current: 0, target: setup.target, mode: setup.mode, style: setup.style,
    deck, deckIdx: 0, skipped: [], pending: null, winner: null, round: 1,
  };
  for (const p of game.players) {
    const s = drawSong();
    p.cards.push(s);
  }
  saveGame();
  go('pass');
}

function newPending() {
  game.pending = { phase: 'ready', song: null, trackId: null, insertIndex: cur().cards.length, playing: false, artistOk: false, titleOk: false };
}

function nextPlayer() {
  game.current = (game.current + 1) % game.players.length;
  if (game.current === 0) game.round++;
  game.pending = null;
  saveGame();
  go('pass');
}

function placementOk(cards, idx, year) {
  const before = cards[idx - 1], after = cards[idx];
  return (!before || before.year <= year) && (!after || year <= after.year);
}

// ================= Spotify: reproducir =================
async function playSongForTurn() {
  const p = game.pending;
  const btn = $('#play-btn');
  if (btn) { btn.disabled = true; btn.classList.add('loading'); }
  try {
    for (let attempt = 0; attempt < 6; attempt++) {
      if (!p.song) p.song = drawSong();
      if (!p.song) { toast('No quedan canciones.'); return; }
      p.trackId = await S.resolveTrack(p.song);
      if (p.trackId) break;
      toast(`«${p.song.title}» no está en Spotify. Pongo otra.`);
      game.skipped.push(songKey(p.song));
      p.song = null;
    }
    if (!p.trackId) { toast('No encuentro canciones en Spotify. Revisa la conexión.'); return; }
    await S.play(p.trackId);
    p.phase = 'listening'; p.playing = true;
    saveGame(); renderTurn();
  } catch (e) {
    handleSpotifyError(e, playSongForTurn);
  } finally {
    const b = $('#play-btn'); if (b) { b.disabled = false; b.classList.remove('loading'); }
  }
}

async function playScanned(trackId) {
  const p = game.pending;
  try {
    const meta = await S.getTrack(trackId);
    p.song = { artist: meta.artist, title: meta.title, year: meta.year || 2000, fromQr: true };
    p.trackId = trackId;
    await S.play(trackId);
    p.phase = 'listening'; p.playing = true;
    saveGame(); renderTurn();
  } catch (e) {
    handleSpotifyError(e, () => playScanned(trackId));
  }
}

function handleSpotifyError(e, retry) {
  if (e.kind === 'nodevice') return showDeviceHelp(retry);
  if (e.kind === 'login') return modal(`
    <h2>Conecta Spotify</h2>
    <p>${esc(e.message)}</p>
    <div class="sheet-actions">
      <button class="btn primary" id="m-login">Conectar Spotify</button>
      <button class="btn ghost" data-close>Ahora no</button>
    </div>`, { onMount: el => $('#m-login', el).onclick = () => S.login().catch(err => toast(err.message)) });
  if (e.kind === 'stuck') return modal(`
    <h2>La canción no ha cambiado</h2>
    <p>${esc(e.message)}</p>
    <div class="sheet-actions">
      <a class="btn secondary" href="spotify:">Abrir Spotify</a>
      <button class="btn primary" id="m-retry">Reintentar</button>
    </div>`, { onMount: (el, close) => { $('#m-retry', el).onclick = () => { close(); retry(); }; } });
  toast(e.message || 'Algo ha fallado con Spotify.');
}

async function showDeviceHelp(retry) {
  let list = [];
  try { list = await S.devices(); } catch {}
  const items = list.map(d => `<button class="device" data-id="${esc(d.id)}"><b>${esc(d.name)}</b><span>${esc(d.type)}${d.is_active ? ' · activo' : ''}</span></button>`).join('');
  modal(`
    <h2>Spotify no está listo</h2>
    <p>La música suena en la app de Spotify de este móvil. Ábrela, dale al play a cualquier canción unos segundos y vuelve aquí.</p>
    ${items ? `<p class="small">O elige dónde sonará:</p><div class="device-list">${items}</div>` : ''}
    <div class="sheet-actions">
      <a class="btn secondary" href="spotify:">Abrir Spotify</a>
      <button class="btn primary" id="m-retry">Ya está, reintentar</button>
    </div>`, {
    onMount: (el, close) => {
      $('#m-retry', el).onclick = () => { close(); retry(); };
      el.querySelectorAll('.device').forEach(b => b.onclick = () => { S.setPreferredDevice(b.dataset.id); close(); retry(); });
    },
  });
}

// ================= Pantalla: inicio =================
function renderHome() {
  const n = setup.count;
  const names = Array.from({ length: n }, (_, i) => `
    <label class="name-field"><span class="dot" style="background:${DECADE_COLORS[i % DECADE_COLORS.length]}"></span>
      <input type="text" maxlength="16" autocomplete="off" data-name="${i}" placeholder="Jugador ${i + 1}" value="${esc(setup.names[i] || '')}">
    </label>`).join('');
  const styles = STYLES.map(s => `
    <button class="style-chip ${setup.style === s.id ? 'on' : ''}" data-style="${s.id}" aria-pressed="${setup.style === s.id}">
      <b>${s.name}</b><span>${s.hint}</span>
    </button>`).join('');
  const logged = S.isLoggedIn();
  const canContinue = game && !game.winner;

  app.innerHTML = `
  <section class="screen home">
    <div class="topbar">
      <span></span><span></span>
      <button class="icon-btn" id="to-settings" aria-label="Ajustes">${ICON.gear}</button>
    </div>
    <h1 class="logo" aria-label="Hitazo">${'HITAZO'.split('').map((c, i) => `<span style="--i:${i}">${c}</span>`).join('')}</h1>
    <p class="tagline">Escucha, adivina y ordena las canciones en el tiempo.</p>

    ${canContinue ? `<button class="btn secondary wide" id="continue">Continuar partida · turno de ${esc(cur().name)}</button>` : ''}

    <div class="panel">
      <div class="row-between">
        <h2>Jugadores</h2>
        <div class="stepper" role="group" aria-label="Número de jugadores">
          <button data-step="-1" aria-label="Quitar jugador" ${n <= 1 ? 'disabled' : ''}>−</button>
          <output>${n}</output>
          <button data-step="1" aria-label="Añadir jugador" ${n >= 10 ? 'disabled' : ''}>+</button>
        </div>
      </div>
      <div class="names">${names}</div>
    </div>

    <div class="panel">
      <h2>Estilo</h2>
      <div class="styles">${styles}</div>
    </div>

    <div class="panel">
      <h2>¿Cómo jugáis?</h2>
      <div class="segmented">
        <button data-mode="app" class="${setup.mode === 'app' ? 'on' : ''}">Con las listas de la app</button>
        <button data-mode="qr" class="${setup.mode === 'qr' ? 'on' : ''}">Escaneando cartas</button>
      </div>
      <p class="small">${setup.mode === 'qr'
        ? 'Escanea el QR de las cartas originales (o de cualquier canción de Spotify). El estilo elegido solo se usa para la carta inicial.'
        : 'La app elige las canciones del estilo que hayáis escogido.'}</p>
      <div class="row-between">
        <h3>Cartas para ganar</h3>
        <div class="stepper" role="group" aria-label="Cartas para ganar">
          <button data-target="-1" ${setup.target <= 3 ? 'disabled' : ''}>−</button>
          <output>${setup.target}</output>
          <button data-target="1" ${setup.target >= 30 ? 'disabled' : ''}>+</button>
        </div>
      </div>
    </div>

    <div class="spotify-row ${logged ? 'ok' : ''}">
      ${ICON.spotify}
      <span>${logged ? `Spotify conectado${profileName ? ' · ' + esc(profileName) : ''}` : 'Spotify sin conectar'}</span>
      ${logged ? '' : `<button class="btn mini" id="sp-login">Conectar</button>`}
    </div>

    <button class="btn primary wide big" id="start">${setup.style === 'epoca' ? 'Elegir épocas' : 'Empezar partida'}</button>
  </section>`;

  app.querySelectorAll('[data-name]').forEach(inp => inp.addEventListener('input', () => { setup.names[+inp.dataset.name] = inp.value; saveSetup(); }));
  app.querySelectorAll('[data-step]').forEach(b => b.onclick = () => { setup.count = Math.min(10, Math.max(1, setup.count + +b.dataset.step)); saveSetup(); renderHome(); });
  app.querySelectorAll('[data-target]').forEach(b => b.onclick = () => { setup.target = Math.min(30, Math.max(3, setup.target + +b.dataset.target)); saveSetup(); renderHome(); });
  app.querySelectorAll('[data-style]').forEach(b => b.onclick = () => { setup.style = b.dataset.style; saveSetup(); renderHome(); });
  app.querySelectorAll('[data-mode]').forEach(b => b.onclick = () => { setup.mode = b.dataset.mode; saveSetup(); renderHome(); });
  $('#to-settings').onclick = () => go('settings');
  $('#sp-login')?.addEventListener('click', () => S.login().catch(e => { toast(e.message); go('settings'); }));
  $('#continue')?.addEventListener('click', () => go(game.pending && game.pending.phase !== 'ready' ? 'turn' : 'pass'));
  $('#start').onclick = () => {
    if (!S.isLoggedIn()) { toast('Conecta Spotify antes de empezar.'); return; }
    if (setup.mode === 'qr' && !Q.readDb()) toast('Recuerda: para las cartas originales hay que cargar su base de datos en Ajustes.');
    if (setup.style === 'epoca') go('eras'); else startGame();
  };
}

// ================= Pantalla: épocas =================
function renderEras() {
  const years = Array.from({ length: MAX_YEAR - MIN_YEAR + 1 }, (_, i) => MIN_YEAR + i);
  while (setup.eras.length < setup.count) setup.eras.push({ from: 1980, to: 1999 });
  const opts = sel => years.map(y => `<option ${y === sel ? 'selected' : ''}>${y}</option>`).join('');
  const pools = erasPool(setup.eras.slice(0, setup.count));
  const total = new Set(pools.flat().map(songKey)).size;
  app.innerHTML = `
  <section class="screen">
    <div class="topbar">
      <button class="icon-btn" id="back" aria-label="Volver">${ICON.back}</button>
      <h1 class="title">Selecciona época</h1><span></span>
    </div>
    <p class="lead">Cada jugador elige un rango de años. Las canciones de todas las épocas se irán alternando.</p>
    ${setup.eras.slice(0, setup.count).map((e, i) => `
      <div class="panel era">
        <h2><span class="dot" style="background:${DECADE_COLORS[i % DECADE_COLORS.length]}"></span>${esc(playerName(i))}</h2>
        <div class="era-row">
          <label>Desde<select data-era="${i}" data-k="from">${opts(e.from)}</select></label>
          <label>Hasta<select data-era="${i}" data-k="to">${opts(e.to)}</select></label>
        </div>
        <p class="small">${pools[i].length} canciones en este rango</p>
      </div>`).join('')}
    <p class="pool ${total < 30 ? 'warn' : ''}">${total} canciones en total${total < 30 ? '. Son pocas: amplía algún rango para partidas largas.' : ''}</p>
    <button class="btn primary wide big" id="start" ${total < setup.count + 5 ? 'disabled' : ''}>Empezar partida</button>
  </section>`;
  app.querySelectorAll('[data-era]').forEach(s => s.onchange = () => { setup.eras[+s.dataset.era][s.dataset.k] = +s.value; saveSetup(); renderEras(); });
  $('#back').onclick = () => go('home');
  $('#start').onclick = startGame;
}

// ================= Pantalla: ajustes =================
function renderSettings() {
  const db = Q.readDb();
  const skus = db ? Object.entries(db) : [];
  const cardCount = skus.reduce((a, [, v]) => a + Object.keys(v.cards).length, 0);
  app.innerHTML = `
  <section class="screen settings">
    <div class="topbar">
      <button class="icon-btn" id="back" aria-label="Volver">${ICON.back}</button>
      <h1 class="title">Ajustes</h1><span></span>
    </div>

    <div class="panel">
      <h2>Spotify</h2>
      <p class="small">Necesitas Spotify Premium y una app creada en el Dashboard de Spotify. Pega aquí su Client ID y añade esta dirección como Redirect URI:</p>
      <div class="copy-row"><code id="redir">${esc(S.redirectUri())}</code><button class="btn mini" id="copy">Copiar</button></div>
      <label class="field">Client ID<input id="cid" type="text" autocomplete="off" spellcheck="false" value="${esc(S.getClientId())}" placeholder="p. ej. 3f9a…"></label>
      <div class="sheet-actions">
        ${S.isLoggedIn()
          ? `<button class="btn secondary" id="devices">Elegir dónde suena</button><button class="btn ghost" id="logout">Desconectar</button>`
          : `<button class="btn primary" id="login">Conectar Spotify</button>`}
      </div>
    </div>

    <div class="panel">
      <h2>Cartas originales</h2>
      <p class="small">Para jugar escaneando las cartas de Hitster, la app necesita la lista oficial que relaciona cada carta con su canción. Se guarda en el móvil.</p>
      <p class="status">${db ? `Cargadas ${skus.length} ediciones y ${cardCount} cartas.` : 'Todavía no hay cartas cargadas.'}</p>
      <div class="sheet-actions">
        <button class="btn secondary" id="dl">Descargar de la web de Hitster</button>
        <label class="btn ghost file">Importar archivo<input type="file" id="file" accept=".json,application/json" hidden></label>
      </div>
      <p class="small">Si la descarga falla, abre <a href="${Q.OFFICIAL_DB_URL}" target="_blank" rel="noopener">este enlace</a>, guarda el archivo y pulsa «Importar archivo».</p>
      ${db ? `<label class="field">Edición para cartas antiguas (QR sin código de edición)
        <select id="sku"><option value="">Sin elegir</option>${skus.map(([k, v]) => `<option value="${k}" ${Q.getDefaultSku() === k ? 'selected' : ''}>${esc(k)}${v.name ? ' · ' + esc(v.name) : ''} (${Object.keys(v.cards).length})</option>`).join('')}</select></label>` : ''}
    </div>

    <div class="panel">
      <h2>Registro de Spotify</h2>
      <p class="small">Lo que ha pasado en las últimas reproducciones. Si algo falla, cópialo y pásamelo.</p>
      <pre class="log" id="log">${esc(S.readLog().slice(-25).join('\n')) || 'Vacío'}</pre>
      <div class="sheet-actions">
        <button class="btn ghost" id="copy-log">Copiar registro</button>
        <button class="btn ghost" id="clear-log">Borrar</button>
      </div>
    </div>

    <div class="panel">
      <h2>Datos</h2>
      <div class="sheet-actions">
        <button class="btn ghost" id="clear-cache">Olvidar canciones encontradas</button>
        ${game ? `<button class="btn ghost danger" id="end-game">Terminar partida en curso</button>` : ''}
      </div>
    </div>
  </section>`;

  $('#back').onclick = () => go('home');
  $('#copy').onclick = () => navigator.clipboard?.writeText(S.redirectUri()).then(() => toast('Copiado'));
  $('#cid').addEventListener('change', e => S.setClientId(e.target.value));
  $('#login')?.addEventListener('click', () => { S.setClientId($('#cid').value); S.login().catch(e => toast(e.message)); });
  $('#logout')?.addEventListener('click', () => { S.logout(); profileName = null; save('hz.profile', null); renderSettings(); });
  $('#devices')?.addEventListener('click', () => showDeviceHelp(() => toast('Listo')));
  $('#dl').onclick = async () => {
    try { const d = await Q.downloadOfficialDb(); toast(`Cargadas ${Object.keys(d).length} ediciones`); renderSettings(); }
    catch { toast('La web de Hitster no deja descargarlo desde aquí. Usa «Importar archivo».'); }
  };
  $('#file').onchange = async e => {
    const f = e.target.files[0]; if (!f) return;
    try { const d = Q.importDb(JSON.parse(await f.text())); toast(`Cargadas ${Object.keys(d).length} ediciones`); renderSettings(); }
    catch (err) { toast(err.message); }
  };
  $('#sku')?.addEventListener('change', e => Q.setDefaultSku(e.target.value));
  $('#copy-log').onclick = () => navigator.clipboard?.writeText(S.readLog().join('\n')).then(() => toast('Registro copiado'));
  $('#clear-log').onclick = () => { S.clearLog(); renderSettings(); };
  $('#clear-cache').onclick = () => { localStorage.removeItem('hz.tracks'); toast('Hecho'); };
  $('#end-game')?.addEventListener('click', () => { game = null; localStorage.removeItem('hz.game'); toast('Partida terminada'); renderSettings(); });
}

// ================= Pantalla: pasar el móvil =================
function scoreChips(highlight) {
  return `<div class="chips">${game.players.map((p, i) => `
    <div class="chip ${i === highlight ? 'on' : ''}"><span class="dot" style="background:${DECADE_COLORS[i % DECADE_COLORS.length]}"></span>
      <b>${esc(p.name)}</b><span>${p.cards.length}/${game.target}</span><span class="tok">${ICON.token}${p.tokens}</span></div>`).join('')}</div>`;
}

function renderPass() {
  const p = cur();
  app.innerHTML = `
  <section class="screen pass">
    <div class="topbar">
      <button class="icon-btn" id="home" aria-label="Inicio">${ICON.home}</button>
      <span class="round">Ronda ${game.round}</span>
      <button class="icon-btn" id="scores" aria-label="Marcador">${ICON.list}</button>
    </div>
    <div class="pass-center">
      <p class="pass-label">Le toca a</p>
      <h1 class="pass-name">${esc(p.name)}</h1>
      <p class="small">Pásale el móvil. Será quien le dé al play.</p>
    </div>
    ${scoreChips(game.current)}
    <button class="btn primary wide big" id="ready">Empezar mi turno</button>
  </section>`;
  $('#home').onclick = () => go('home');
  $('#scores').onclick = showScores;
  $('#ready').onclick = () => { if (!game.pending) newPending(); saveGame(); go('turn'); };
}

function showScores() {
  modal(`
    <h2>Marcador</h2>
    <div class="score-list">${game.players.map((p, i) => `
      <details ${i === game.current ? 'open' : ''}>
        <summary><span class="dot" style="background:${DECADE_COLORS[i % DECADE_COLORS.length]}"></span><b>${esc(p.name)}</b>
          <span>${p.cards.length}/${game.target} cartas</span><span class="tok">${ICON.token}${p.tokens}</span></summary>
        <ol class="mini-timeline">${p.cards.map(c => `<li><b>${c.year}</b> ${esc(c.artist)} — ${esc(c.title)}</li>`).join('')}</ol>
      </details>`).join('')}</div>
    <div class="sheet-actions"><button class="btn primary" data-close>Cerrar</button></div>`);
}

// ================= Pantalla: turno =================
function cardHtml(c) {
  return `<li class="tcard" style="--c:${cardColor(c.year)}">
    <span class="y">${c.year}</span>
    <span class="meta"><b>${esc(c.title)}</b><span>${esc(c.artist)}</span></span>
  </li>`;
}

function renderTurn() {
  const p = cur(), pd = game.pending;
  const qr = game.mode === 'qr';
  const phase = pd.phase;
  const showMystery = phase !== 'ready';
  const items = p.cards.map(cardHtml);

  let mystery = '';
  if (showMystery) {
    if (phase === 'listening') {
      mystery = `<li class="tcard mystery" id="mystery" tabindex="0" aria-label="Carta misteriosa. Arrástrala a su sitio.">
        <span class="grip" aria-hidden="true">${ICON.grip}</span>
        <span class="q">?</span>
        <span class="meta"><b>Carta misteriosa</b><span>Arrástrala a su sitio</span></span>
        <span class="arrows"><button data-move="-1" aria-label="Subir">▲</button><button data-move="1" aria-label="Bajar">▼</button></span>
      </li>`;
    } else {
      const ok = pd.correct;
      mystery = `<li class="tcard revealed ${ok ? 'good' : 'bad'}" id="mystery" style="--c:${cardColor(pd.song.year)}">
        <span class="y">${pd.song.year}</span>
        <span class="meta"><b>${esc(pd.song.title)}</b><span>${esc(pd.song.artist)}</span></span>
        <span class="badge">${ok ? '✓' : '✗'}</span>
      </li>`;
    }
    items.splice(pd.insertIndex, 0, mystery);
  }

  let deck = '';
  if (phase === 'ready') {
    deck = qr
      ? `<div class="deck"><button class="disc-btn" id="scan-btn"><span class="vinyl">${ICON.qr}</span><span class="lbl">Escanear carta</span></button>
           <p class="small">Enfoca el QR de la carta. La música empezará sola.</p></div>`
      : `<div class="deck"><button class="disc-btn" id="play-btn"><span class="vinyl">${ICON.play}</span><span class="lbl">Reproducir</span></button>
           <p class="small">Dale al play y escucha. Nadie mira el móvil de Spotify.</p></div>`;
  } else if (phase === 'listening') {
    deck = `<div class="deck playing">
      <div class="disc ${pd.playing ? 'spin' : ''}" aria-hidden="true"><i></i></div>
      <div class="deck-controls">
        <button class="btn mini" id="toggle">${pd.playing ? 'Pausar' : 'Seguir'}</button>
        <button class="btn mini" id="restart">Desde el principio</button>
        <button class="btn mini token" id="skip" ${p.tokens < 1 ? 'disabled' : ''}>${ICON.token} Pasar (${p.tokens})</button>
      </div>
      <p class="small">Di en voz alta artista y título, y arrastra la carta entre tus cartas.</p>
    </div>`;
  } else if (phase === 'revealed') {
    deck = `<div class="verdict ${pd.correct ? 'good' : 'bad'}">
      <h2>${pd.correct ? '¡Año bien colocado!' : 'Año mal colocado'}</h2>
      ${pd.song.fromQr ? `<div class="year-fix"><span>Año de la carta</span>
        <div class="stepper"><button data-year="-1">−</button><output>${pd.song.year}</output><button data-year="1">+</button></div></div>
        <p class="small">Comprueba el año impreso en la carta: Spotify a veces da el de una reedición.</p>` : ''}
      <p class="ask">¿Ha acertado ${esc(p.name)}?</p>
      <div class="checks">
        <button class="check ${pd.artistOk ? 'on' : ''}" data-check="artistOk" aria-pressed="${pd.artistOk}">${pd.artistOk ? '✓' : ''}<span>Artista</span></button>
        <button class="check ${pd.titleOk ? 'on' : ''}" data-check="titleOk" aria-pressed="${pd.titleOk}">${pd.titleOk ? '✓' : ''}<span>Título</span></button>
      </div>
    </div>`;
  } else if (phase === 'done') {
    const r = pd.result;
    deck = `<div class="verdict ${r.kept ? 'good' : 'bad'}">
      <h2>${r.kept ? '¡Carta conseguida!' : 'Esta carta no vale'}</h2>
      <p>${r.kept ? `${esc(p.name)} ya tiene ${p.cards.length} de ${game.target} cartas.`
        : !r.any ? 'No ha acertado ni el artista ni el título.' : 'El año no estaba en su sitio.'}
      ${r.kept ? `<br><b class="plus">${ICON.token} +1 ficha</b> para pasar una canción cuando quieras.` : ''}</p>
    </div>`;
  }

  const next = game.players[(game.current + 1) % game.players.length];
  let cta = '';
  if (phase === 'listening') cta = `<button class="btn primary wide big" id="reveal">Desvelar carta</button>`;
  if (phase === 'revealed') cta = `<button class="btn primary wide big" id="confirm">Confirmar</button>`;
  if (phase === 'done') cta = game.winner != null
    ? `<button class="btn primary wide big" id="to-win">¡Ver quién gana!</button>`
    : `<button class="btn primary wide big" id="next">${game.players.length > 1 ? `Pasar a ${esc(next.name)}` : 'Siguiente canción'}</button>`;

  app.innerHTML = `
  <section class="screen turn">
    <div class="topbar">
      <button class="icon-btn" id="home" aria-label="Inicio">${ICON.home}</button>
      <div class="who"><b>${esc(p.name)}</b><span>${p.cards.length}/${game.target} cartas · <span class="tok">${ICON.token}${p.tokens}</span></span></div>
      <button class="icon-btn" id="scores" aria-label="Marcador">${ICON.list}</button>
    </div>
    ${deck}
    <div class="timeline-wrap" id="tl-wrap">
      <p class="tl-end">Más antigua</p>
      <ol class="timeline" id="timeline">${items.join('')}</ol>
      <p class="tl-end">Más reciente</p>
    </div>
    <div class="cta-bar">${cta}</div>
    ${qr ? `<div class="scanner" id="scanner" hidden><video id="cam" muted playsinline></video><div class="frame"></div>
      <button class="btn secondary" id="scan-cancel">Cancelar</button></div>` : ''}
  </section>`;

  $('#home').onclick = () => { S.pause().catch(() => {}); go('home'); };
  $('#scores').onclick = showScores;
  $('#play-btn')?.addEventListener('click', playSongForTurn);
  $('#scan-btn')?.addEventListener('click', openScanner);
  $('#toggle')?.addEventListener('click', async () => {
    try { pd.playing ? await S.pause() : await S.resume(); pd.playing = !pd.playing; renderTurn(); }
    catch (e) { handleSpotifyError(e, () => S.play(pd.trackId)); }
  });
  $('#restart')?.addEventListener('click', () => S.play(pd.trackId).then(() => { pd.playing = true; renderTurn(); }).catch(e => handleSpotifyError(e, () => S.play(pd.trackId))));
  $('#skip')?.addEventListener('click', useToken);
  $('#reveal')?.addEventListener('click', reveal);
  app.querySelectorAll('[data-check]').forEach(b => b.onclick = () => { pd[b.dataset.check] = !pd[b.dataset.check]; buzz(10); saveGame(); renderTurn(); });
  app.querySelectorAll('[data-year]').forEach(b => b.onclick = () => {
    pd.song.year += +b.dataset.year;
    pd.correct = placementOk(p.cards, pd.insertIndex, pd.song.year);
    saveGame(); renderTurn();
  });
  $('#confirm')?.addEventListener('click', confirmTurn);
  $('#next')?.addEventListener('click', () => { S.pause().catch(() => {}); nextPlayer(); });
  $('#to-win')?.addEventListener('click', () => { S.pause().catch(() => {}); go('win'); });

  if (phase === 'listening') bindDrag();
  const m = $('#mystery');
  if (m && phase !== 'ready') requestAnimationFrame(() => m.scrollIntoView({ block: 'center', behavior: 'smooth' }));
}

// ---- Arrastrar la carta misteriosa ----
function bindDrag() {
  const list = $('#timeline'), wrap = $('#tl-wrap'), m = $('#mystery');
  const pd = game.pending;
  let dragging = false, lastY = 0, raf = 0;

  const placeAt = y => {
    const cards = [...list.querySelectorAll('.tcard:not(.mystery)')];
    const idx = cards.filter(c => { const r = c.getBoundingClientRect(); return r.top + r.height / 2 < y; }).length;
    if (idx !== pd.insertIndex) {
      list.insertBefore(m, cards[idx] || null);
      pd.insertIndex = idx; buzz(6);
    }
  };
  const loop = () => {
    if (!dragging) return;
    const r = wrap.getBoundingClientRect();
    if (lastY < r.top + 70) wrap.scrollTop -= 10;
    else if (lastY > r.bottom - 70) wrap.scrollTop += 10;
    placeAt(lastY);
    raf = requestAnimationFrame(loop);
  };
  m.addEventListener('pointerdown', e => {
    if (e.target.closest('button')) return;
    e.preventDefault();
    dragging = true; lastY = e.clientY;
    list.setPointerCapture(e.pointerId);
    m.classList.add('dragging'); buzz(12);
    raf = requestAnimationFrame(loop);
  });
  list.addEventListener('pointermove', e => { if (dragging) lastY = e.clientY; });
  const end = () => {
    if (!dragging) return;
    dragging = false; cancelAnimationFrame(raf);
    m.classList.remove('dragging'); saveGame();
  };
  list.addEventListener('pointerup', end);
  list.addEventListener('pointercancel', end);
  m.querySelectorAll('[data-move]').forEach(b => b.addEventListener('click', () => {
    const n = cur().cards.length;
    pd.insertIndex = Math.max(0, Math.min(n, pd.insertIndex + +b.dataset.move));
    saveGame(); renderTurn();
  }));
  m.addEventListener('keydown', e => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault();
      pd.insertIndex = Math.max(0, Math.min(cur().cards.length, pd.insertIndex + (e.key === 'ArrowUp' ? -1 : 1)));
      saveGame(); renderTurn(); $('#mystery')?.focus();
    }
  });
}

function useToken() {
  const p = cur(), pd = game.pending;
  if (p.tokens < 1) return;
  p.tokens--;
  game.skipped.push(songKey(pd.song));
  toast('Ficha usada. ¡Otra canción!');
  if (game.mode === 'qr') {
    Object.assign(pd, { phase: 'ready', song: null, trackId: null, playing: false });
    S.pause().catch(() => {});
    saveGame(); renderTurn();
  } else {
    pd.song = null; pd.trackId = null;
    saveGame(); playSongForTurn();
  }
}

function reveal() {
  const pd = game.pending;
  pd.correct = placementOk(cur().cards, pd.insertIndex, pd.song.year);
  pd.phase = 'revealed';
  buzz(pd.correct ? [20, 40, 20] : 60);
  saveGame(); renderTurn();
}

function confirmTurn() {
  const p = cur(), pd = game.pending;
  const any = pd.artistOk || pd.titleOk;
  const both = pd.artistOk && pd.titleOk;
  const kept = pd.correct && any;
  if (kept) {
    p.tokens++;
    const { fromQr, ...card } = pd.song;
    p.cards.splice(pd.insertIndex, 0, card);
    if (p.cards.length >= game.target) game.winner = game.current;
  }
  pd.result = { kept, any, both };
  pd.phase = 'done';
  saveGame(); renderTurn();
}

// ---- Escáner ----
async function openScanner() {
  const box = $('#scanner'), video = $('#cam');
  box.hidden = false;
  $('#scan-cancel').onclick = () => { Q.stopScanner(); box.hidden = true; };
  try {
    await Q.startScanner(video, text => {
      box.hidden = true; buzz(30);
      const r = Q.resolveQr(text);
      if (r.error) { toast(r.error); return; }
      playScanned(r.id);
    });
  } catch {
    box.hidden = true;
    toast('No se puede usar la cámara. Revisa el permiso en el navegador.');
  }
}

// ================= Pantalla: victoria =================
function renderWin() {
  const w = game.players[game.winner];
  const ranking = game.players.map((p, i) => ({ ...p, i })).sort((a, b) => b.cards.length - a.cards.length || b.tokens - a.tokens);
  app.innerHTML = `
  <section class="screen win">
    <div class="confetti" aria-hidden="true">${Array.from({ length: 28 }, (_, i) => `<i style="--x:${Math.random() * 100}%;--d:${(Math.random() * 1.5).toFixed(2)}s;--c:${DECADE_COLORS[i % DECADE_COLORS.length]}"></i>`).join('')}</div>
    <p class="pass-label">Ha ganado</p>
    <h1 class="pass-name">${esc(w.name)}</h1>
    <ol class="ranking">${ranking.map((p, k) => `<li class="${p.i === game.winner ? 'on' : ''}"><span class="pos">${k + 1}</span><b>${esc(p.name)}</b><span>${p.cards.length} cartas</span><span class="tok">${ICON.token}${p.tokens}</span></li>`).join('')}</ol>
    <ol class="mini-timeline big">${w.cards.map(c => `<li style="--c:${cardColor(c.year)}"><b>${c.year}</b> ${esc(c.artist)} — ${esc(c.title)}</li>`).join('')}</ol>
    <button class="btn primary wide big" id="again">Revancha</button>
    <button class="btn ghost wide" id="home">Volver al inicio</button>
  </section>`;
  $('#again').onclick = () => { game = null; startGame(); };
  $('#home').onclick = () => { game = null; localStorage.removeItem('hz.game'); go('home'); };
}

// ================= Iconos =================
const ICON = {
  gear: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3.2"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>',
  back: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M15 5l-7 7 7 7"/></svg>',
  home: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"><path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z"/></svg>',
  list: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M8 6h13M8 12h13M8 18h13M3.5 6h.01M3.5 12h.01M3.5 18h.01"/></svg>',
  play: '<svg viewBox="0 0 24 24" width="44" height="44" fill="currentColor"><path d="M8 5.5v13a1 1 0 0 0 1.5.9l10.4-6.5a1 1 0 0 0 0-1.7L9.5 4.6A1 1 0 0 0 8 5.5z"/></svg>',
  qr: '<svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3h-3zM20 14v.01M14 20h.01M17 20h4v-3"/></svg>',
  token: '<svg class="ico-token" viewBox="0 0 24 24" width="16" height="16"><circle cx="12" cy="12" r="10" fill="#FFE04A"/><circle cx="12" cy="12" r="6.5" fill="none" stroke="#070C38" stroke-width="2"/><path d="M12 8.5v7M8.5 12h7" stroke="#070C38" stroke-width="2" stroke-linecap="round"/></svg>',
  grip: '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><circle cx="9" cy="6" r="1.6"/><circle cx="15" cy="6" r="1.6"/><circle cx="9" cy="12" r="1.6"/><circle cx="15" cy="12" r="1.6"/><circle cx="9" cy="18" r="1.6"/><circle cx="15" cy="18" r="1.6"/></svg>',
  spotify: '<svg viewBox="0 0 24 24" width="22" height="22"><circle cx="12" cy="12" r="11" fill="#1ED760"/><path d="M6.5 9.3c3.8-1.1 8-.8 11.2 1M7.2 12.4c3.1-.9 6.5-.6 9.2.9M7.9 15.3c2.5-.6 5-.4 7.1.7" stroke="#070C38" stroke-width="1.8" fill="none" stroke-linecap="round"/></svg>',
};

// ================= Arranque =================
async function boot() {
  const res = await S.handleRedirect().catch(() => ({ error: 'No se pudo conectar con Spotify.' }));
  if (res?.error) toast(res.error);
  if (S.isLoggedIn()) {
    S.initBrowserPlayer();
    S.me().then(u => { profileName = u.display_name || u.id; save('hz.profile', profileName); if (screen === 'home') renderHome(); }).catch(() => {});
    if (res?.ok) toast('Spotify conectado');
  }
  render();
  if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => {});
  // Mantiene la pantalla encendida durante la partida
  const lock = () => { if (document.visibilityState === 'visible') navigator.wakeLock?.request('screen').catch(() => {}); };
  document.addEventListener('visibilitychange', lock); lock();
}
boot();
