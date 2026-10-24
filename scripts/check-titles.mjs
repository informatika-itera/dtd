// Judul kartu dasbor (registry.ts) harus sama persis dengan judul slide sampul (TitleSlide) tiap deck.
import { readFileSync } from 'node:fs';
const root = new URL('..', import.meta.url).pathname;
const reg = readFileSync(root + 'src/decks/registry.ts', 'utf8');
let bad = 0, n = 0;
for (const m of reg.matchAll(/number: (\d+), title: "([^"]+)"[^}]*?deck: true/g)) {
  const num = Number(m[1]); const file = `${root}src/decks/pertemuan-${String(num).padStart(2, '0')}.tsx`;
  const src = readFileSync(file, 'utf8');
  const t = src.match(/<TitleSlide[^>]*?title="([^"]+)"/s)?.[1];
  n++;
  if (t !== m[2]) { bad++; console.log(`✗ Pertemuan ${num}: kartu "${m[2]}" ≠ sampul "${t}"`); }
}
console.log(bad ? `\n${bad} judul berbeda.` : `OK: ${n} judul kartu dasbor sama dengan judul sampul.`);
process.exit(bad ? 1 : 0);
