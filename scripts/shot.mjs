// Screenshot slides of a deck via Chrome DevTools Protocol (Brave/Chromium, no Playwright needed).
// Usage: node scripts/shot.mjs <url> <outDir> [slideIndexes e.g. 0,1,2 | all]
// Env: VIEWPORT=1280x720, FRAGS=1 (buka semua fragment, mis. jawaban kuis)
import { spawn } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';

const [url, outDir, which = 'all'] = process.argv.slice(2);
mkdirSync(outDir, { recursive: true });
const bin = process.env.BROWSER_BIN || 'brave';
const [VW, VH] = (process.env.VIEWPORT || '1280x720').split('x').map(Number);
const port = 9300 + Math.floor(Math.random() * 500);
const proc = spawn(bin, ['--headless=new', '--no-sandbox', '--disable-gpu', '--hide-scrollbars',
  `--remote-debugging-port=${port}`, `--window-size=${VW},${VH}`, '--user-data-dir=' + outDir + '/.profile', 'about:blank'], { stdio: 'ignore' });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let targets;
for (let i = 0; i < 50; i++) {
  try { targets = await (await fetch(`http://127.0.0.1:${port}/json`)).json(); break; } catch { await sleep(200); }
}
const ws = new WebSocket(targets.find((t) => t.type === 'page').webSocketDebuggerUrl);
await new Promise((r) => (ws.onopen = r));
let id = 0; const pending = new Map(); const logs = [];
ws.onmessage = (m) => {
  const d = JSON.parse(m.data);
  if (d.id && pending.has(d.id)) { pending.get(d.id)(d.result ?? d.error); pending.delete(d.id); }
  else if (d.method === 'Runtime.exceptionThrown') logs.push('EXC ' + (d.params.exceptionDetails.exception?.description ?? d.params.exceptionDetails.text));
  else if (d.method === 'Runtime.consoleAPICalled' && ['error', 'warning'].includes(d.params.type)) logs.push(d.params.type + ' ' + d.params.args.map((a) => a.value ?? a.description).join(' '));
};
const send = (method, params = {}) => new Promise((r) => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
const ev = async (expression) => (await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true })).result?.value;

await send('Runtime.enable'); await send('Page.enable');
await send('Emulation.setDeviceMetricsOverride', { width: VW, height: VH, deviceScaleFactor: 1, mobile: false });
await send('Page.navigate', { url });
for (let i = 0; i < 100 && !(await ev('!!document.querySelector(".reveal.ready")')); i++) await sleep(200);
await ev('document.fonts.ready.then(() => true)'); await sleep(500);
const total = await ev('Reveal?.getTotalSlides?.() ?? document.querySelectorAll(".slides > section").length') ;
const n = total || await ev('document.querySelectorAll(".slides > section").length');
const idx = which === 'all' ? [...Array(n).keys()] : which.split(',').map(Number);
for (const i of idx) {
  await ev(`location.hash = '#/${i}'`); await sleep(350);
  if (process.env.FRAGS) { // FRAGS=1: tekan → sebanyak fragment di slide (seperti dosen), lalu ambil gambar
    const nf = await ev("document.querySelectorAll('section.present .fragment').length");
    for (let k = 0; k < nf; k++) { for (const type of ['keyDown', 'keyUp']) await send('Input.dispatchKeyEvent', { type, key: 'ArrowRight', code: 'ArrowRight', windowsVirtualKeyCode: 39 }); await sleep(250); }
    await sleep(300);
  }
  const issues = await ev(`(() => {
    const inner = document.querySelector('section.present .inner');
    const out = [];
    if (inner) { const box = inner.getBoundingClientRect(); let over = 0, overX = 0, worst = '';
      inner.querySelectorAll('*').forEach((el) => { if (el.closest('.brush-bg,.logos')) return; const r = el.getBoundingClientRect(); if (!r.width || !r.height) return;
        if (r.bottom - box.bottom > over || r.right - box.right > overX) worst = el.tagName.toLowerCase() + '.' + String(el.className).split(' ')[0]; over = Math.max(over, r.bottom - box.bottom); overX = Math.max(overX, r.right - box.right); });
      const clipped = [...inner.querySelectorAll('*')].filter((el) => !el.closest('.brush-bg,.logos') && el.scrollHeight - el.clientHeight > 24 && el.clientHeight > 0 && !['svg','path','tr','td','th','table','tbody','thead','h1','h2','span','code'].includes(el.tagName.toLowerCase()));
      if (clipped.length) out.push('content-overflows-box x' + clipped.length + ' [' + clipped.slice(0, 2).map((e) => e.tagName.toLowerCase() + '.' + String(e.className).split(' ')[0] + ' +' + (e.scrollHeight - e.clientHeight) + 'px').join(' | ') + ']');
      if (over > 1) out.push('overflow-y ' + Math.round(over) + 'px (' + worst + ')'); if (overX > 1) out.push('overflow-x ' + Math.round(overX) + 'px (' + worst + ')'); }
    const w = document.createTreeWalker(document.querySelector('section.present'), NodeFilter.SHOW_TEXT);
    let small = 0, n; const ex = []; while ((n = w.nextNode())) { const el = n.parentElement; const fs = parseFloat(getComputedStyle(el).fontSize); if (n.textContent.trim() && el.closest('.katex') == null && fs < 19.9) { small++; if (ex.length < 3) ex.push(el.tagName.toLowerCase() + '.' + el.className + ' ' + fs.toFixed(1) + 'px "' + n.textContent.trim().slice(0, 18) + '"'); } }
    if (small) out.push('text<20px x' + small + ' [' + ex.join(' | ') + ']');
    return out.join(', ');
  })()`);
  if (issues) console.log(`slide ${i + 1}: ${issues}`);
  const { data } = await send('Page.captureScreenshot', { format: 'png' });
  writeFileSync(`${outDir}/s${String(i + 1).padStart(2, '0')}.png`, Buffer.from(data, 'base64'));
}
console.log(`slides: ${n}, shots: ${idx.length}`);
if (logs.length) console.log('LOGS:\n' + [...new Set(logs)].join('\n'));
ws.close(); proc.kill();
