// Conexión con Spotify: login PKCE, búsqueda de canciones y control de la reproducción (Spotify Connect).
// En el móvil la música suena en la app de Spotify; en un ordenador puede sonar en el propio navegador.

const LS = {
  clientId: 'hz.clientId',
  tokens: 'hz.tokens',
  verifier: 'hz.verifier',
  device: 'hz.device',
  tracks: 'hz.tracks',
};
const SCOPES = 'user-read-playback-state user-modify-playback-state user-read-currently-playing streaming user-read-private user-read-email';

export const redirectUri = () => location.origin + location.pathname;
export const getClientId = () => localStorage.getItem(LS.clientId) || '';
export const setClientId = id => localStorage.setItem(LS.clientId, id.trim());

function readTokens() {
  try { return JSON.parse(localStorage.getItem(LS.tokens)) || null; } catch { return null; }
}
function saveTokens(t) {
  const prev = readTokens() || {};
  const tokens = {
    access: t.access_token,
    refresh: t.refresh_token || prev.refresh,
    expires: Date.now() + (t.expires_in - 60) * 1000,
  };
  localStorage.setItem(LS.tokens, JSON.stringify(tokens));
  return tokens;
}
export const isLoggedIn = () => !!readTokens()?.refresh;
export function logout() { localStorage.removeItem(LS.tokens); localStorage.removeItem(LS.device); }

const b64url = buf => btoa(String.fromCharCode(...new Uint8Array(buf))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

export async function login() {
  const clientId = getClientId();
  if (!clientId) throw new Error('Falta el Client ID de Spotify. Añádelo en Ajustes.');
  const verifier = b64url(crypto.getRandomValues(new Uint8Array(64)));
  localStorage.setItem(LS.verifier, verifier);
  const challenge = b64url(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(verifier)));
  const params = new URLSearchParams({
    client_id: clientId, response_type: 'code', redirect_uri: redirectUri(),
    code_challenge_method: 'S256', code_challenge: challenge, scope: SCOPES,
  });
  location.href = 'https://accounts.spotify.com/authorize?' + params;
}

// Se llama al cargar la app: si venimos de Spotify con ?code=, cambia el código por tokens.
export async function handleRedirect() {
  const q = new URLSearchParams(location.search);
  if (!q.has('code') && !q.has('error')) return null;
  history.replaceState(null, '', redirectUri());
  if (q.has('error')) return { error: 'Spotify no ha dado permiso: ' + q.get('error') };
  const body = new URLSearchParams({
    client_id: getClientId(), grant_type: 'authorization_code', code: q.get('code'),
    redirect_uri: redirectUri(), code_verifier: localStorage.getItem(LS.verifier) || '',
  });
  const r = await fetch('https://accounts.spotify.com/api/token', { method: 'POST', body });
  if (!r.ok) return { error: 'No se pudo completar el inicio de sesión en Spotify (' + r.status + ').' };
  saveTokens(await r.json());
  return { ok: true };
}

async function token() {
  let t = readTokens();
  if (!t) throw new SpotifyError('login', 'Conecta tu cuenta de Spotify para jugar.');
  if (Date.now() < t.expires) return t.access;
  const body = new URLSearchParams({ client_id: getClientId(), grant_type: 'refresh_token', refresh_token: t.refresh });
  const r = await fetch('https://accounts.spotify.com/api/token', { method: 'POST', body });
  if (!r.ok) { logout(); throw new SpotifyError('login', 'La sesión de Spotify ha caducado. Vuelve a conectarla.'); }
  return saveTokens(await r.json()).access;
}

export class SpotifyError extends Error {
  constructor(kind, msg) { super(msg); this.kind = kind; }
}

async function api(path, { method = 'GET', body, retry = true } = {}) {
  const r = await fetch('https://api.spotify.com/v1' + path, {
    method,
    headers: { Authorization: 'Bearer ' + await token(), ...(body ? { 'Content-Type': 'application/json' } : {}) },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (r.status === 401 && retry) {
    const t = readTokens(); if (t) { t.expires = 0; localStorage.setItem(LS.tokens, JSON.stringify(t)); }
    return api(path, { method, body, retry: false });
  }
  if (r.status === 429) throw new SpotifyError('rate', 'Spotify está limitando las peticiones. Espera unos segundos.');
  if (r.status === 403) {
    let reason = '';
    try { reason = (await r.json()).error?.message || ''; } catch {}
    throw new SpotifyError('forbidden', 'Spotify ha rechazado la petición. ' + (reason || 'Comprueba que tu cuenta es Premium y está añadida en el Dashboard de la app.'));
  }
  if (r.status === 404 && path.startsWith('/me/player')) throw new SpotifyError('nodevice', 'No hay ningún dispositivo de Spotify activo.');
  if (!r.ok) throw new SpotifyError('http', 'Error de Spotify (' + r.status + ').');
  if (r.status === 204) return null;
  const txt = await r.text();
  return txt ? JSON.parse(txt) : null;
}

export const me = () => api('/me');

// ---------- Buscar canciones ----------
const norm = s => (s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
  .replace(/\(.*?\)|\[.*?\]/g, ' ').replace(/ - .*$/, ' ').replace(/[^a-z0-9ñ ]/g, ' ').replace(/\s+/g, ' ').trim();
const BAD = /karaoke|instrumental|tribute|cover|in the style|made famous|8-bit|lullaby|piano version/i;

function readCache() { try { return JSON.parse(localStorage.getItem(LS.tracks)) || {}; } catch { return {}; } }

function score(item, song) {
  if (BAD.test(item.name) || BAD.test(item.album?.name || '')) return -1;
  const t = norm(item.name), want = norm(song.title);
  const artists = item.artists.map(a => norm(a.name)).join(' ');
  const wantArtist = norm(song.artist).split(' ')[0];
  let s = 0;
  if (t === want) s += 3; else if (t.includes(want) || want.includes(t)) s += 2;
  if (artists.includes(wantArtist)) s += 3;
  if (/live|en vivo|directo/i.test(item.name)) s -= 1;
  if (/remaster/i.test(item.name)) s -= 0.2;
  return s;
}

// Datos de cada canción encontrada (álbum y nombre) para poder reproducirla y comprobar que suena
const INFO_KEY = 'hz.trackinfo';
function readInfo() { try { return JSON.parse(localStorage.getItem(INFO_KEY)) || {}; } catch { return {}; } }
function saveInfo(id, data) { const all = readInfo(); all[id] = data; localStorage.setItem(INFO_KEY, JSON.stringify(all)); }

// ---------- Registro para diagnosticar problemas ----------
const LOG_KEY = 'hz.log';
export function dbg(msg) {
  let l; try { l = JSON.parse(localStorage.getItem(LOG_KEY)) || []; } catch { l = []; }
  l.push(new Date().toLocaleTimeString('es-ES') + '  ' + msg);
  localStorage.setItem(LOG_KEY, JSON.stringify(l.slice(-60)));
}
export const readLog = () => { try { return JSON.parse(localStorage.getItem(LOG_KEY)) || []; } catch { return []; } };
export const clearLog = () => localStorage.removeItem(LOG_KEY);

export async function resolveTrack(song) {
  const key = (song.artist + '|' + song.title).toLowerCase();
  const cache = readCache();
  if (cache[key]) return cache[key] === 'none' ? null : cache[key];
  const queries = [
    `track:${song.title} artist:${song.artist}`,
    `${song.title} ${song.artist}`,
  ];
  let best = null, bestScore = 2.5;
  for (const q of queries) {
    const res = await api('/search?type=track&limit=10&market=from_token&q=' + encodeURIComponent(q));
    for (const it of res?.tracks?.items || []) {
      const s = score(it, song);
      if (s > bestScore) { best = it; bestScore = s; }
    }
    if (best) break;
  }
  const id = best ? best.id : null;
  if (best) saveInfo(id, { album: best.album?.uri || (best.album?.id ? 'spotify:album:' + best.album.id : null), name: best.name });
  cache[key] = id || 'none';
  localStorage.setItem(LS.tracks, JSON.stringify(cache));
  return id;
}

async function trackInfo(id) {
  const known = readInfo()[id];
  if (known?.album) return known;
  try {
    const t = await api('/tracks/' + id + '?market=from_token');
    const data = { album: t.album?.uri || (t.album?.id ? 'spotify:album:' + t.album.id : null), name: t.name };
    saveInfo(id, data);
    return data;
  } catch { return known || {}; }
}

export async function getTrack(id) {
  const t = await api('/tracks/' + id + '?market=from_token');
  saveInfo(id, { album: t.album?.uri || (t.album?.id ? 'spotify:album:' + t.album.id : null), name: t.name });
  return {
    artist: t.artists.map(a => a.name).join(', '),
    title: t.name,
    year: parseInt((t.album?.release_date || '').slice(0, 4), 10) || null,
  };
}

// ---------- Reproductor ----------
let sdkDeviceId = null, sdkError = null;
const sleep = ms => new Promise(r => setTimeout(r, ms));

// Texto neutro para la notificación del móvil, para que no se vea la canción
function hideMetadata() {
  if (!('mediaSession' in navigator)) return;
  try { navigator.mediaSession.metadata = new MediaMetadata({ title: 'Hitazo', artist: '¿Qué canción es?', album: '' }); } catch {}
}

// Reproductor de Spotify dentro de la propia web (Web Playback SDK): la música suena en Hitazo
export function initBrowserPlayer() {
  if (!isLoggedIn() || window.__hzSdk) return;
  window.__hzSdk = true;
  dbg('Cargando el reproductor de Hitazo');
  window.onSpotifyWebPlaybackSDKReady = () => {
    const player = new window.Spotify.Player({
      name: 'Hitazo',
      getOAuthToken: cb => token().then(cb).catch(() => {}),
      volume: 1,
    });
    player.addListener('ready', ({ device_id }) => { sdkDeviceId = device_id; sdkError = null; dbg('Reproductor de Hitazo listo'); });
    player.addListener('not_ready', () => { sdkDeviceId = null; dbg('Reproductor de Hitazo desconectado'); });
    for (const ev of ['initialization_error', 'authentication_error', 'account_error', 'playback_error']) {
      player.addListener(ev, ({ message }) => { if (ev !== 'playback_error') sdkError = message; dbg(`Reproductor de Hitazo: ${ev} ${message}`); });
    }
    player.addListener('autoplay_failed', () => dbg('El navegador ha bloqueado el sonido automático'));
    player.addListener('player_state_changed', () => { hideMetadata(); setTimeout(hideMetadata, 300); });
    player.connect();
    window.__hzPlayer = player;
  };
  const s = document.createElement('script');
  s.src = 'https://sdk.scdn.co/spotify-player.js';
  s.onerror = () => { sdkError = 'no se pudo descargar'; dbg('No se pudo descargar el reproductor de Spotify'); };
  document.head.appendChild(s);
}

// Llamar dentro del toque del usuario: los móviles exigen un toque para que suene el audio
export function unlockSdk() {
  try { window.__hzPlayer?.activateElement?.(); } catch {}
}

async function waitSdk(ms = 9000) {
  initBrowserPlayer();
  const end = Date.now() + ms;
  while (!sdkDeviceId && !sdkError && Date.now() < end) await sleep(250);
  if (sdkDeviceId) return sdkDeviceId;
  throw new SpotifyError('nosdk', sdkError
    ? 'El reproductor de Spotify no funciona en este navegador (' + sdkError + ').'
    : 'El reproductor de Spotify no ha arrancado en este navegador.');
}

export async function devices() {
  const r = await api('/me/player/devices');
  return r?.devices || [];
}
export const setPreferredDevice = id => localStorage.setItem(LS.device, id);

// Para el modo "app de Spotify": elige el móvil o el dispositivo activo, nunca el reproductor de Hitazo
async function pickDevice() {
  const list = await devices();
  dbg('Dispositivos: ' + (list.map(d => `${d.name} (${d.type}${d.is_active ? ', activo' : ''})`).join(' | ') || 'ninguno'));
  const others = list.filter(d => d.id !== sdkDeviceId && d.name !== 'Hitazo');
  const pref = localStorage.getItem(LS.device);
  const found = others.find(d => d.id === pref)
    || others.find(d => d.is_active)
    || others.find(d => d.type === 'Smartphone')
    || others[0];
  if (!found) throw new SpotifyError('nodevice', 'No hay ningún dispositivo de Spotify activo.');
  dbg('Uso: ' + found.name);
  return found.id;
}

async function nowPlaying() {
  try {
    const r = await api('/me/player/currently-playing?market=from_token');
    return r?.item ? { id: r.item.id, name: r.item.name, playing: r.is_playing } : null;
  } catch { return null; }
}

// Espera hasta ~3 s a que suene la canción pedida. Devuelve true, false o 'unknown' si Spotify no informa.
async function confirmPlaying(trackId, name) {
  let seen = false, last = null;
  for (let i = 0; i < 6; i++) {
    await sleep(500);
    const now = await nowPlaying();
    if (!now) continue;
    seen = true; last = now;
    if (now.id === trackId || (name && norm(now.name) === norm(name))) return true;
  }
  dbg(seen ? `Sigue sonando «${last.name}»` : 'Spotify no dice qué está sonando');
  return seen ? false : 'unknown';
}

// target: 'sdk' = suena dentro de Hitazo · 'spotify' = suena en la app de Spotify
export async function play(trackId, positionMs = 0, target = 'spotify') {
  const uri = 'spotify:track:' + trackId;
  if (target === 'sdk') {
    const dev = encodeURIComponent(await waitSdk());
    dbg('Pedir en Hitazo ' + trackId);
    await api('/me/player/repeat?state=off&device_id=' + dev, { method: 'PUT' }).catch(() => {});
    await api('/me/player/play?device_id=' + dev, { method: 'PUT', body: { uris: [uri], position_ms: positionMs } });
    hideMetadata();
    // Comprueba que de verdad ha arrancado (si el navegador lo bloquea, el reproductor se queda parado)
    for (let i = 0; i < 15; i++) {
      await sleep(400);
      const st = await window.__hzPlayer?.getCurrentState?.();
      if (st && !st.paused) { hideMetadata(); dbg('Suena en Hitazo'); return; }
    }
    throw new SpotifyError('nosdk', sdkError
      ? 'El reproductor de Spotify no funciona en este navegador (' + sdkError + ').'
      : 'El reproductor de Spotify no consigue sonar en este navegador.');
  }

  const dev = encodeURIComponent(await pickDevice());
  const info = await trackInfo(trackId);
  dbg(`Pedir «${info.name || trackId}»`);
  await api('/me/player/repeat?state=off&device_id=' + dev, { method: 'PUT' }).catch(() => {});

  const methods = [];
  // 1) El álbum empezando en la canción: es lo que mejor obedece la app de Spotify del móvil
  if (info.album) methods.push(['álbum', () => api('/me/player/play?device_id=' + dev, {
    method: 'PUT', body: { context_uri: info.album, offset: { uri }, position_ms: positionMs },
  })]);
  // 2) La canción suelta
  methods.push(['canción', () => api('/me/player/play?device_id=' + dev, {
    method: 'PUT', body: { uris: [uri], position_ms: positionMs },
  })]);
  // 3) A la cola y saltar
  methods.push(['cola', async () => {
    await api('/me/player/queue?uri=' + encodeURIComponent(uri) + '&device_id=' + dev, { method: 'POST' });
    await sleep(400);
    await api('/me/player/next?device_id=' + dev, { method: 'POST' });
  }]);

  for (const [label, run] of methods) {
    try { await run(); } catch (e) { dbg(`Método ${label}: error ${e.message}`); if (e.kind === 'nodevice' || e.kind === 'login') throw e; continue; }
    const ok = await confirmPlaying(trackId, info.name);
    dbg(`Método ${label}: ${ok === true ? 'OK' : ok === 'unknown' ? 'sin confirmar' : 'no ha cambiado'}`);
    if (ok) return;
  }
  throw new SpotifyError('stuck', 'Spotify no ha cambiado de canción. Abre la app de Spotify, pásala a cualquier otra canción y vuelve a darle al play.');
}

export const pause = (target = 'spotify') => target === 'sdk' && window.__hzPlayer
  ? window.__hzPlayer.pause()
  : api('/me/player/pause', { method: 'PUT' }).catch(e => { if (e.kind !== 'nodevice') throw e; });
export const resume = (target = 'spotify') => target === 'sdk' && window.__hzPlayer
  ? window.__hzPlayer.resume()
  : api('/me/player/play', { method: 'PUT' });
