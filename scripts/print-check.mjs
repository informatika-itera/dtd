// Print-to-PDF check: jumlah halaman = jumlah slide + langkah fragment (reveal.js mencetak satu halaman per langkah animasi), ukuran 16:9.
// Usage: node scripts/print-check.mjs <baseUrl> <deck...>   e.g. http://127.0.0.1:4173 1 2 3
import { spawn } from 'node:child_process';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
const [base, ...decks] = process.argv.slice(2);
const port = 9400 + Math.floor(Math.random() * 300);
const work = mkdtempSync(join(tmpdir(), 'dtd-print-')); // dihapus otomatis di akhir
const proc = spawn(process.env.BROWSER_BIN || 'brave', ['--headless=new', '--no-sandbox', '--disable-gpu', `--remote-debugging-port=${port}`, `--user-data-dir=${work}/profile`, 'about:blank'], { stdio: 'ignore' });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let t; for (let i = 0; i < 50; i++) { try { t = await (await fetch(`http://127.0.0.1:${port}/json`)).json(); break; } catch { await sleep(200); } }
const ws = new WebSocket(t.find((x) => x.type === 'page').webSocketDebuggerUrl); await new Promise((r) => (ws.onopen = r));
let id = 0; const pend = new Map();
ws.onmessage = (m) => { const d = JSON.parse(m.data); if (d.id && pend.has(d.id)) { pend.get(d.id)(d.result); pend.delete(d.id); } };
const send = (method, params = {}) => new Promise((r) => { const i = ++id; pend.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
const ev = async (e) => (await send('Runtime.evaluate', { expression: e, awaitPromise: true, returnByValue: true })).result?.value;
await send('Page.enable');
let bad = 0;
for (const n of decks) {
  await send('Page.navigate', { url: `${base}/pertemuan-${n}.html` });
  for (let i = 0; i < 100 && !(await ev(`!!document.querySelector('.reveal.ready')`)); i++) await sleep(200);
  await sleep(500);
  const nSlides = await ev(`document.querySelectorAll('.slides section.page').length`);
  // langkah fragment per slide: indeks unik (fragment tanpa indeks dihitung satu per satu)
  const steps = await ev(`[...document.querySelectorAll('.slides section.page')].reduce((a, s) => { const f = [...s.querySelectorAll('.fragment')]; const idx = new Set(f.filter((e) => e.dataset.fragmentIndex !== undefined).map((e) => e.dataset.fragmentIndex)); return a + idx.size + f.filter((e) => e.dataset.fragmentIndex === undefined).length; }, 0)`);
  await send('Page.navigate', { url: `${base}/pertemuan-${n}.html?print-pdf&noprint` });
  for (let i = 0; i < 100 && !(await ev(`!!document.querySelector('.reveal.ready')`)); i++) await sleep(200);
  await ev('document.fonts.ready.then(() => true)'); await sleep(1200);
  const slides = await ev(`document.querySelectorAll('.pdf-page, .slides section.page').length`);
  const pdfPages = await ev(`document.querySelectorAll('.pdf-page').length`);
  const { data } = await send('Page.printToPDF', { preferCSSPageSize: true, printBackground: true });
  const buf = Buffer.from(data, 'base64');
  const file = `${work}/deck${n}.pdf`;
  writeFileSync(file, buf);
  if (process.env.KEEP) writeFileSync(`${process.env.KEEP}/deck${n}.pdf`, buf); // KEEP=<dir>: simpan PDF untuk diperiksa
  const info = execFileSync('pdfinfo', [file], { encoding: 'utf8' });
  const pages = Number(/Pages:\s+(\d+)/.exec(info)?.[1]);
  const box = /Page size:\s+([\d.]+) x ([\d.]+)/.exec(info);
  const expected = nSlides + steps;
  const ok = pages === expected;
  console.log(`deck ${n}: pdf pages=${pages}, slides=${nSlides}+fragments=${steps}, pdf-page wrappers=${pdfPages}, mediabox=${box ? box[1] + 'x' + box[2] : '?'} ${ok ? 'OK' : 'MISMATCH'}`);
  if (!ok) bad++;
}
ws.close(); proc.kill(); await sleep(500); rmSync(work, { recursive: true, force: true }); process.exit(bad ? 1 : 0);
