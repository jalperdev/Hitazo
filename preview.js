// Fragmentos de 30 s de iTunes, reproducidos dentro de Hitazo (no necesita Spotify).

const CACHE_KEY = 'hz.previews';
// Medio segundo de silencio en WAV, generado aquí mismo
const SILENCE = (() => {
  const n = 4000, buf = new ArrayBuffer(44 + n * 2), v = new DataView(buf);
  const w = (o, str) => [...str].forEach((c, k) => v.setUint8(o + k, c.charCodeAt(0)));
  w(0, 'RIFF'); v.setUint32(4, 36 + n * 2, true); w(8, 'WAVEfmt '); v.setUint32(16, 16, true);
  v.setUint16(20, 1, true); v.setUint16(22, 1, true); v.setUint32(24, 8000, true); v.setUint32(28, 16000, true);
  v.setUint16(32, 2, true); v.setUint16(34, 16, true); w(36, 'data'); v.setUint32(40, n * 2, true);
  let bin = ''; new Uint8Array(buf).forEach(b => { bin += String.fromCharCode(b); });
  return 'data:audio/wav;base64,' + btoa(bin);
})();

const audio = new Audio();
audio.preload = 'auto';
audio.loop = true;
let unlocked = false;

const norm = s => (s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
  .replace(/\(.*?\)|\[.*?\]/g, ' ').replace(/ - .*$/, ' ').replace(/[^a-z0-9ñ ]/g, ' ').replace(/\s+/g, ' ').trim();

// Hay que llamarlo dentro del toque del usuario: así el navegador deja sonar el audio después
export function unlock() {
  hideMetadata();
  if (unlocked) return;
  audio.src = SILENCE;
  audio.play().then(() => { unlocked = true; }).catch(() => {});
}

// Texto neutro para la notificación del móvil, para que no se vea la canción
export function hideMetadata() {
  if (!('mediaSession' in navigator)) return;
  try {
    navigator.mediaSession.metadata = new MediaMetadata({ title: 'Hitazo', artist: '¿Qué canción es?', album: '' });
  } catch {}
}

function jsonp(url, timeout = 8000) {
  return new Promise((resolve, reject) => {
    const cb = 'hz_cb_' + Math.random().toString(36).slice(2);
    const s = document.createElement('script');
    const t = setTimeout(() => { cleanup(); reject(new Error('timeout')); }, timeout);
    const cleanup = () => { clearTimeout(t); delete window[cb]; s.remove(); };
    window[cb] = data => { cleanup(); resolve(data); };
    s.onerror = () => { cleanup(); reject(new Error('network')); };
    s.src = url + (url.includes('?') ? '&' : '?') + 'callback=' + cb;
    document.head.appendChild(s);
  });
}

function readCache() { try { return JSON.parse(localStorage.getItem(CACHE_KEY)) || {}; } catch { return {}; } }

function score(r, song) {
  if (!r.previewUrl) return -1;
  if (/karaoke|tribute|instrumental|in the style|made famous/i.test(r.trackName + ' ' + r.collectionName + ' ' + r.artistName)) return -1;
  const t = norm(r.trackName), want = norm(song.title);
  const a = norm(r.artistName), wantA = norm(song.artist).split(' ')[0];
  let s = 0;
  if (t === want) s += 3; else if (t.includes(want) || want.includes(t)) s += 2;
  if (a.includes(wantA)) s += 3;
  if (/live|en vivo|directo/i.test(r.trackName)) s -= 1;
  return s;
}

export async function findPreview(song) {
  const key = (song.artist + '|' + song.title).toLowerCase();
  const cache = readCache();
  if (cache[key]) return cache[key] === 'none' ? null : cache[key];
  let best = null, bestScore = 4;
  for (const country of ['ES', 'US']) {
    const term = encodeURIComponent(`${song.artist} ${song.title}`.replace(/[^\p{L}\p{N}' ]/gu, ' '));
    const data = await jsonp(`https://itunes.apple.com/search?media=music&entity=song&limit=15&country=${country}&term=${term}`);
    for (const r of data.results || []) {
      const s = score(r, song);
      if (s > bestScore) { best = r; bestScore = s; }
    }
    if (best) break;
  }
  const url = best ? best.previewUrl.replace(/^http:/, 'https:') : null;
  cache[key] = url || 'none';
  localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  return url;
}

export async function play(url) {
  audio.src = url;
  audio.currentTime = 0;
  await audio.play();
  hideMetadata();
}
export const pause = () => audio.pause();
export const resume = () => audio.play();
export function restart() { audio.currentTime = 0; return audio.play(); }
export function stop() { audio.pause(); }
export const clearCache = () => localStorage.removeItem(CACHE_KEY);
