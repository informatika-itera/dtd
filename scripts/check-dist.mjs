// Pastikan hasil build memuat semua berkas unduhan (templat/data) dan halaman deck.
// Dipanggil otomatis oleh `bun run build`; gagal (exit 1) bila ada yang hilang, kosong, atau bukan berkas .docx/.xlsx (ZIP).
import { existsSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const dist = join(root, 'dist');
const manifest = readFileSync(join(root, 'src/files-manifest.ts'), 'utf8');
const files = [...manifest.matchAll(/"file": "([^"]+)",[\s\S]*?"bytes": (\d+)/g)].map((m) => ({ file: m[1], bytes: Number(m[2]) }));
const registry = readFileSync(join(root, 'src/decks/registry.ts'), 'utf8');
const decks = [...registry.matchAll(/number: (\d+),[^}]*?deck: (?!false)/g)].map((m) => Number(m[1]));
let bad = 0;
const fail = (m) => { console.log('✗ ' + m); bad++; };

if (!files.length) fail('manifest kosong (src/files-manifest.ts) — jalankan `bun run gen:files`');
for (const f of files) {
  const p = join(dist, 'files', f.file);
  if (!existsSync(p)) { fail(`dist/files/${f.file} tidak ada (periksa slides/public/files dan .gitignore)`); continue; }
  const buf = readFileSync(p);
  if (buf.length === 0) fail(`dist/files/${f.file} kosong`);
  else if (buf.length !== f.bytes) fail(`dist/files/${f.file}: ukuran ${buf.length} ≠ manifest ${f.bytes} — jalankan ulang \`bun run gen:files\``);
  else if (buf[0] !== 0x50 || buf[1] !== 0x4b) fail(`dist/files/${f.file} bukan berkas OOXML (ZIP)`);
}
for (const n of [...new Set(decks)]) if (!existsSync(join(dist, `pertemuan-${n}.html`))) fail(`dist/pertemuan-${n}.html tidak ada`);
if (!existsSync(join(dist, 'index.html'))) fail('dist/index.html tidak ada');
console.log(bad ? `\n${bad} masalah.` : `OK: ${files.length} berkas unduhan dan ${new Set(decks).size} deck ada di dist/`);
process.exit(bad ? 1 : 0);
