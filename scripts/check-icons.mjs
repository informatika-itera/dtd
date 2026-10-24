// Flags Material Symbols names that did not resolve to a glyph (they render as wide text instead of an icon).
// Usage: node scripts/check-icons.mjs <deck...>   (dev server on :8931)
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
const profileDir = mkdtempSync(join(tmpdir(), 'dtd-icons-')); // dihapus di akhir
import { spawn } from 'node:child_process';
const port = 9600 + Math.floor(Math.random() * 300);
const proc = spawn(process.env.BROWSER_BIN || 'brave', ['--headless=new', '--no-sandbox', '--disable-gpu', `--remote-debugging-port=${port}`, '--window-size=1280,720', `--user-data-dir=${profileDir}`, 'about:blank'], { stdio: 'ignore' });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let t; for (let i = 0; i < 50; i++) { try { t = await (await fetch(`http://127.0.0.1:${port}/json`)).json(); break; } catch { await sleep(200); } }
const ws = new WebSocket(t.find((x) => x.type === 'page').webSocketDebuggerUrl); await new Promise((r) => (ws.onopen = r));
let id = 0; const pend = new Map();
ws.onmessage = (m) => { const d = JSON.parse(m.data); if (d.id && pend.has(d.id)) { pend.get(d.id)(d.result); pend.delete(d.id); } };
const send = (method, params = {}) => new Promise((r) => { const i = ++id; pend.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
const ev = async (e) => (await send('Runtime.evaluate', { expression: e, awaitPromise: true, returnByValue: true })).result?.value;
await send('Page.enable');
let bad = 0;
for (const n of process.argv.slice(2)) {
  await send('Page.navigate', { url: `http://127.0.0.1:8931/pertemuan-${n}.html` });
  for (let i = 0; i < 100 && !(await ev(`!!document.querySelector('.reveal.ready')`)); i++) await sleep(200);
  await ev('document.fonts.ready.then(() => true)'); await sleep(400);
  const res = await ev(`JSON.stringify([...document.querySelectorAll('span[aria-hidden="true"]')].filter((s) => /Material Symbols/.test(getComputedStyle(s).fontFamily)).filter((s) => (() => { const r = document.createRange(); r.selectNodeContents(s); return r.getBoundingClientRect().width; })() > parseFloat(getComputedStyle(s).fontSize) * 1.6).map((s) => s.textContent))`);
  const names = [...new Set(JSON.parse(res))];
  console.log(`deck ${n}: ${names.length ? 'MISSING ' + names.join(', ') : 'all icons resolve'}`);
  bad += names.length;
}
ws.close(); proc.kill(); rmSync(profileDir, { recursive: true, force: true }); process.exit(bad ? 1 : 0);
