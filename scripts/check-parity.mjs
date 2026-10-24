// Text parity: every word on a legacy slide must still appear on the same slide of the new deck.
// Usage: node scripts/check-parity.mjs <deckNumber...>   (dev server must run on :8931)
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
const profileDir = mkdtempSync(join(tmpdir(), 'dtd-parity-')); // dihapus di akhir
import { spawn } from 'node:child_process';
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

// legacy decks live in legacy/ — serve them statically (text parity only needs the DOM)
const legacyDir = resolve(import.meta.dirname, '..', 'legacy');
const legacyServer = createServer(async (req, res) => {
  try { const b = await readFile(resolve(legacyDir, '.' + new URL(req.url, 'http://x').pathname)); res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' }); res.end(b); } catch { res.writeHead(404); res.end(); }
});
await new Promise((r) => legacyServer.listen(0, '127.0.0.1', r));
const legacyPort = legacyServer.address().port;

const nums = process.argv.slice(2);
const port = 9100 + Math.floor(Math.random() * 300);
const proc = spawn(process.env.BROWSER_BIN || 'brave', ['--headless=new', '--no-sandbox', '--disable-gpu', `--remote-debugging-port=${port}`, '--window-size=1280,720', `--user-data-dir=${profileDir}`, 'about:blank'], { stdio: 'ignore' });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let t; for (let i = 0; i < 50; i++) { try { t = await (await fetch(`http://127.0.0.1:${port}/json`)).json(); break; } catch { await sleep(200); } }
const ws = new WebSocket(t.find((x) => x.type === 'page').webSocketDebuggerUrl);
await new Promise((r) => (ws.onopen = r));
let id = 0; const pend = new Map();
ws.onmessage = (m) => { const d = JSON.parse(m.data); if (d.id && pend.has(d.id)) { pend.get(d.id)(d.result); pend.delete(d.id); } };
const send = (method, params = {}) => new Promise((r) => { const i = ++id; pend.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
const ev = async (e) => (await send('Runtime.evaluate', { expression: e, awaitPromise: true, returnByValue: true })).result?.value;

const EXTRACT = (sel, drop) => `(() => [...document.querySelectorAll('${sel}')].map((s) => {
  const c = s.cloneNode(true);
  c.querySelectorAll('${drop}').forEach((n) => n.remove());
  c.querySelectorAll('*').forEach((n) => { if (!n.matches('strong,em,b,i,a')) { n.before(' '); n.after(' '); } });
  return c.textContent;
}))()`;
const SUP = { '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4', '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9' };
const norm = (s) => s.replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]/g, (c) => ` ${SUP[c]} `).toLowerCase().replace(/[\u{1F000}-\u{1FFFF}☀-➿️‍]/gu, ' ').replace(/[^\p{L}\p{N}]+/gu, ' ').split(' ').filter(Boolean).map((w) => (/^\d+$/.test(w) ? String(Number(w)) : w));
const counts = (arr) => arr.reduce((m, w) => (m.set(w, (m.get(w) || 0) + 1), m), new Map());

async function load(url, ready) {
  await send('Page.enable'); await send('Page.navigate', { url });
  for (let i = 0; i < 100 && !(await ev(`!!document.querySelector('${ready}')`)); i++) await sleep(200);
  await sleep(500);
}

// legacy slide (1-based) -> number of new slides it was split into
const SPLITS = { 9: { 13: 2 }, 10: { 12: 2 } };
// intentional content changes: { deck: { drop: [legacy slide numbers removed], allow: { legacySlide: [words that may be missing/added] } } }
const EXC = JSON.parse(readFileSync(resolve(import.meta.dirname, 'parity-exceptions.json'), 'utf8'));
let bad = 0;
for (const n of nums) {
  if (EXC[n]?.rewritten) { console.log(`deck ${n}: ditulis ulang sengaja (paritas dilewati) — ${EXC[n].rewritten}`); continue; }
  await load(`http://127.0.0.1:${legacyPort}/pertemuan-${n}.html`, '.slides > section');
  const legacy = await ev(EXTRACT('.slides > section', '.slide-footer, svg, script, style, .timer-btn, .masthead, .header-logos'));
  await load(`http://127.0.0.1:8931/pertemuan-${n}.html`, '.reveal.ready');
  let next = await ev(EXTRACT('.slides section.page', '[aria-hidden="true"], .slide-number, script, style'));
  const titles = await ev(`[...document.querySelectorAll('.slides section.page')].map((s) => (s.querySelector('h2, h1')?.textContent || '').trim())`);
  const skipTitles = new Set((EXC[n]?.skipNew ?? []));
  next = next.filter((_, i) => !skipTitles.has(titles[i]));
  // Fase B: slide "Selanjutnya" lama dilebur ke penutup (ClosingSlide + nextItems) — teksnya digabung otomatis.
  if (legacy.length > 2 && norm(legacy[legacy.length - 2]).slice(0, 1).join(' ') === 'selanjutnya') { legacy.splice(legacy.length - 2, 2, legacy[legacy.length - 2] + ' ' + legacy[legacy.length - 1]); }
  const sp = SPLITS[n] ?? {};
  const exc = { ...(EXC[n] ?? {}) };
  // Fase B: slide "Post-Test: Jawaban" lama digabung ke slide soal (jawaban jadi fragment) — otomatis dianggap dibuang.
  const auto = legacy.map((t, i) => (norm(t).slice(0, 3).join(' ') === 'post test jawaban' ? i + 1 : 0)).filter(Boolean);
  exc.drop = [...new Set([...(exc.drop ?? []), ...auto])];
  if (Object.keys(sp).length) { const merged = []; let j = 0; legacy.forEach((_, i) => { if (exc.drop.includes(i + 1)) return; const k = sp[i + 1] ?? 1; merged.push(next.slice(j, j + k).join(' ')); j += k; }); next = merged; }
  const nums = legacy.map((_, i) => i + 1).filter((k) => !exc.drop.includes(k));
  const legacyKept = nums.map((k) => legacy[k - 1]);
  if (legacyKept.length !== next.length) { console.log(`deck ${n}: SLIDE COUNT legacy=${legacyKept.length} (of ${legacy.length}, dropped ${(exc.drop ?? []).length}) new=${next.length}`); bad++; }
  const loss = [];
  legacyKept.forEach((txt, i) => {
    const k = nums[i];
    const allow = new Set((exc.allow?.[k] ?? []).map((w) => w.toLowerCase()));
    const a = counts(norm(txt)), b = counts(norm(next[i] ?? ''));
    const miss = [...a].filter(([w, c]) => (b.get(w) || 0) < c && !allow.has(w)).map(([w, c]) => (c > 1 ? `${w}×${c - (b.get(w) || 0)}` : w));
    if (miss.length) loss.push(`  legacy slide ${k}: ${miss.join(' ')}`);
  });
  console.log(`deck ${n}: ${legacyKept.length} slides, ${loss.length ? loss.length + ' with missing words' : 'OK'}`);
  if (loss.length) { console.log(loss.join('\n')); bad++; }
}
ws.close(); proc.kill(); rmSync(profileDir, { recursive: true, force: true }); legacyServer.close();
process.exit(bad ? 1 : 0);
