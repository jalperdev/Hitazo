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
  cache[key] = id || 'none';
  localStorage.setItem(LS.tracks, JSON.stringify(cache));
  return id;
}

export async function getTrack(id) {
  const t = await api('/tracks/' + id + '?market=from_token');
  return {
    artist: t.artists.map(a => a.name).join(', '),
    title: t.name,
    year: parseInt((t.album?.release_date || '').slice(0, 4), 10) || null,
  };
}

// ---------- Reproductor ----------
let sdkDeviceId = null;
const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);

// En ordenador, el navegador puede ser el propio altavoz (Web Playback SDK). En móvil Spotify no lo permite.
export function initBrowserPlayer() {
  if (isMobile || !isLoggedIn() || window.__hzSdk) return;
  window.__hzSdk = true;
  window.onSpotifyWebPlaybackSDKReady = () => {
    const player = new window.Spotify.Player({
      name: 'Hitazo (este navegador)',
      getOAuthToken: cb => token().then(cb).catch(() => {}),
      volume: 0.9,
    });
    player.addListener('ready', ({ device_id }) => { sdkDeviceId = device_id; });
    player.addListener('not_ready', () => { sdkDeviceId = null; });
    player.connect();
    window.__hzPlayer = player;
  };
  const s = document.createElement('script');
  s.src = 'https://sdk.scdn.co/spotify-player.js';
  document.head.appendChild(s);
}

export async function devices() {
  const r = await api('/me/player/devices');
  return r?.devices || [];
}
export const setPreferredDevice = id => localStorage.setItem(LS.device, id);

async function pickDevice() {
  const list = await devices();
  const pref = localStorage.getItem(LS.device);
  const found = list.find(d => d.id === pref)
    || (sdkDeviceId && list.find(d => d.id === sdkDeviceId))
    || list.find(d => d.is_active)
    || list.find(d => d.type === 'Smartphone')
    || list[0];
  if (!found) throw new SpotifyError('nodevice', 'No hay ningún dispositivo de Spotify activo.');
  return found.id;
}

export async function play(trackId, positionMs = 0) {
  if (window.__hzPlayer?.activateElement) { try { await window.__hzPlayer.activateElement(); } catch {} }
  const id = await pickDevice();
  await api('/me/player/play?device_id=' + encodeURIComponent(id), {
    method: 'PUT', body: { uris: ['spotify:track:' + trackId], position_ms: positionMs },
  });
  // Evita que al acabar la canción salte otra que muestre el título en pantalla
  api('/me/player/repeat?state=track&device_id=' + encodeURIComponent(id), { method: 'PUT' }).catch(() => {});
}
export const pause = () => api('/me/player/pause', { method: 'PUT' }).catch(e => { if (e.kind !== 'nodevice') throw e; });
export const resume = () => api('/me/player/play', { method: 'PUT' });
