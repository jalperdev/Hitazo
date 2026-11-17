// Escáner de QR y base de datos de las cartas originales de Hitster.

const DB_KEY = 'hz.hitsterdb';
const DEFAULT_SKU_KEY = 'hz.defaultSku';
export const OFFICIAL_DB_URL = 'https://hitster.jumboplay.com/hitster-assets/gameset_database.json';

// ---------- Base de datos de cartas ----------
export function readDb() {
  try { return JSON.parse(localStorage.getItem(DB_KEY)) || null; } catch { return null; }
}
export const getDefaultSku = () => localStorage.getItem(DEFAULT_SKU_KEY) || '';
export const setDefaultSku = sku => localStorage.setItem(DEFAULT_SKU_KEY, sku);

// Convierte el JSON oficial en un mapa compacto { sku: { name, cards: { numero: spotifyId } } }
export function importDb(json) {
  const sets = json.gamesets || json;
  if (!Array.isArray(sets)) throw new Error('El archivo no tiene el formato esperado (falta "gamesets").');
  const db = {};
  for (const g of sets) {
    const sku = g.sku || g.SKU;
    const cards = g.gameset_data?.cards || g.cards || [];
    if (!sku || !cards.length) continue;
    const name = g.gameset_data?.gameset_name || g.gameset_name || g.name || g.gameset_data?.name || '';
    const map = {};
    for (const c of cards) {
      const n = parseInt(c.CardNumber ?? c.cardNumber ?? c.n, 10);
      const id = c.Spotify ?? c.spotify ?? c.id;
      if (n && id) map[n] = String(id).replace(/^spotify:track:/, '');
    }
    db[sku.toLowerCase()] = { name, lang: g.gameset_language || g.language || '', cards: map };
  }
  if (!Object.keys(db).length) throw new Error('No se han encontrado cartas en el archivo.');
  localStorage.setItem(DB_KEY, JSON.stringify(db));
  return db;
}

export async function downloadOfficialDb() {
  const r = await fetch(OFFICIAL_DB_URL, { cache: 'no-store' });
  if (!r.ok) throw new Error('La web de Hitster ha respondido ' + r.status);
  return importDb(await r.json());
}

// Traduce el texto de un QR a un id de canción de Spotify
export function resolveQr(text) {
  const t = (text || '').trim();
  let m = t.match(/open\.spotify\.com\/(?:intl-[a-z]+\/)?track\/([A-Za-z0-9]{22})/) || t.match(/spotify:track:([A-Za-z0-9]{22})/);
  if (m) return { id: m[1] };
  m = t.match(/hitstergame\.com\/([a-z-]+)\/([a-z]{4}\d{4})\/(\d+)/i);
  let sku, num;
  if (m) { sku = m[2].toLowerCase(); num = parseInt(m[3], 10); }
  else {
    m = t.match(/hitstergame\.com\/([a-z-]+)\/(\d+)/i);
    if (m) { sku = getDefaultSku(); num = parseInt(m[2], 10); }
  }
  if (!num) return { error: 'Este QR no es de una carta de Hitster ni de una canción de Spotify.' };
  const db = readDb();
  if (!db) return { error: 'Primero carga la base de datos de las cartas en Ajustes.' };
  if (!sku) return { error: 'Esta carta es de una edición antigua. Elige tu edición en Ajustes.' };
  const set = db[sku];
  if (!set) return { error: `La edición ${sku} no está en la base de datos cargada.` };
  const id = set.cards[num];
  if (!id) return { error: `No encuentro la carta ${num} de la edición ${sku}.` };
  return { id, sku, num };
}

// ---------- Cámara ----------
let stream = null, running = false;

export async function startScanner(video, onResult) {
  stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' }, audio: false });
  video.srcObject = stream;
  video.setAttribute('playsinline', '');
  await video.play();
  running = true;
  const useNative = 'BarcodeDetector' in window && (await window.BarcodeDetector.getSupportedFormats?.() || []).includes('qr_code');
  const detector = useNative ? new window.BarcodeDetector({ formats: ['qr_code'] }) : null;
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  const tick = async () => {
    if (!running) return;
    try {
      let text = null;
      if (detector) {
        const codes = await detector.detect(video);
        if (codes.length) text = codes[0].rawValue;
      } else if (video.videoWidth) {
        const w = 480, h = Math.round(video.videoHeight * (480 / video.videoWidth));
        canvas.width = w; canvas.height = h;
        ctx.drawImage(video, 0, 0, w, h);
        const img = ctx.getImageData(0, 0, w, h);
        const code = window.jsQR(img.data, w, h, { inversionAttempts: 'dontInvert' });
        if (code) text = code.data;
      }
      if (text) { stopScanner(); onResult(text); return; }
    } catch {}
    setTimeout(tick, 120);
  };
  tick();
}

export function stopScanner() {
  running = false;
  if (stream) { stream.getTracks().forEach(t => t.stop()); stream = null; }
}
