// Uji situs yang SUDAH terbit: setiap berkas unduhan harus dapat diambil (HTTP 200, ukuran sama, berkas ZIP).
// Pakai: node scripts/check-published.mjs https://informatika-itera.github.io/dtd/   (juga dipanggil di CI setelah deploy)
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const base = (process.argv[2] ?? '').replace(/\/?$/, '/');
if (!/^https?:\/\//.test(base)) { console.error('Pemakaian: node scripts/check-published.mjs <url-situs>'); process.exit(2); }
const root = new URL('..', import.meta.url).pathname;
const manifest = readFileSync(join(root, 'src/files-manifest.ts'), 'utf8');
const files = [...manifest.matchAll(/"file": "([^"]+)",[\s\S]*?"bytes": (\d+)/g)].map((m) => ({ file: m[1], bytes: Number(m[2]) }));
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function check(url, bytes) {
  const res = await fetch(url + (url.includes('?') ? '&' : '?') + 'cb=' + Date.now(), { redirect: 'follow' });
  const buf = Buffer.from(await res.arrayBuffer());
  if (res.status !== 200) return `HTTP ${res.status}`;
  if (bytes !== undefined) {
    if (buf.length !== bytes) return `ukuran ${buf.length} ≠ ${bytes}`;
    if (buf[0] !== 0x50 || buf[1] !== 0x4b) return 'bukan berkas ZIP/OOXML (mungkin halaman 404 HTML)';
  }
  return '';
}
let bad = 0;
for (const f of files) {
  const url = base + 'files/' + f.file;
  let err = 'belum dicoba';
  for (let i = 0; i < 12 && err; i++) { // deploy Pages butuh beberapa detik untuk menyebar
    try { err = await check(url, f.bytes); } catch (e) { err = String(e.message ?? e); }
    if (err && i < 11) await sleep(5000);
  }
  console.log(err ? `✗ ${url} — ${err}` : `✓ ${url}`);
  if (err) bad++;
}
process.exit(bad ? 1 : 0);
