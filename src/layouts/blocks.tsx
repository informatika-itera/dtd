import { Children, useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { Icon } from '../ui';
import { asset } from '../ui/assets';
import { Page } from './index';
import { FILES } from '../files-manifest';
import './blocks.css';

type C = { children?: ReactNode };

/** Generic content slide: title + a stack of blocks. */
export function ContentSlide({ title, notes, children }: { title: string; notes?: string } & C) {
  return (
    <Page notes={notes}>
      <h2>{title}</h2>
      {children}
    </Page>
  );
}

/** Left/right split. `left` and `right` are block stacks; right is usually a figure, table, or diagram. */
export function SplitSlide({ title, left, right, notes }: { title: string; left: ReactNode; right: ReactNode; notes?: string }) {
  return (
    <Page notes={notes}>
      <h2>{title}</h2>
      <div className="split">
        <div className="stack">{left}</div>
        <div className="stack aside">{right}</div>
      </div>
    </Page>
  );
}

export const Para = ({ tone = 'body', children }: { tone?: 'body' | 'caption' | 'highlight' | 'source' } & C) => (
  <p className={`para ${tone}`}>{children}</p>
);
export const Bullets = ({ children }: C) => <ul className="bullets">{children}</ul>;

export const Stats = ({ children }: C) => (
  <div className="stats" style={{ ['--cols' as string]: Children.count(children) } as CSSProperties}>{children}</div>
);
export const Stat = ({ n, l }: { n: ReactNode; l: ReactNode }) => (
  <div className="stat"><div className="num">{n}</div><div className="lab">{l}</div></div>
);

/** Empat kartu selalu 2×2 (bukan satu baris empat kolom) — lebih lega dan lebih terbaca di proyektor. */
export function Cards({ cols = 3, tight, children }: { cols?: number; tight?: boolean } & C) {
  const c = Children.count(children) === 4 ? 2 : cols;
  return <div className={`cards ${tight ? 'dense' : ''}`} style={{ ['--cols' as string]: c } as CSSProperties}>{children}</div>;
}
export function Card({ icon, glyph, num, title, mono, tone, children }: { icon?: string; glyph?: string; num?: number; title?: ReactNode; mono?: boolean; tone?: 'secondary' | 'tertiary' } & C) {
  return (
    <div className={`card ${tone ? 't-' + tone : ''}`}>
      {icon && <div className="ico"><Icon name={icon} size={32} /></div>}
      {glyph && <div className="ico num">{glyph}</div>}
      {num !== undefined && <div className="ico num">{num}</div>}
      {title && <h3 className={mono ? 'mono' : ''}>{title}</h3>}
      {children}
    </div>
  );
}

export const Flow = ({ children }: C) => <div className="flow">{children}</div>;
export const Arrow = ({ glyph = '→' }: { glyph?: string }) => (
  <span className={`arrow ${glyph === '→' ? 'ic' : ''}`}>{glyph === '→' ? <Icon name="arrow_forward" size={40} /> : glyph === '↓' ? <Icon name="arrow_downward" size={40} /> : <span className="glyph">{glyph}</span>}</span>
);
export function Box({ icon, title, primary, children }: { icon?: string; title?: ReactNode; primary?: boolean } & C) {
  return (
    <div className={`node ${primary ? 'hi' : ''}`}>
      {icon && <Icon name={icon} size={40} />}
      {title && <h3>{title}</h3>}
      {children}
    </div>
  );
}

export function Callout({ title, children }: { title?: ReactNode } & C) {
  return <div className="callout">{title && <strong className="ct">{title}</strong>}<div className="cc">{children}</div></div>;
}

export const Cols = ({ children }: C) => <div className="cols">{children}</div>;
export const Col = ({ title, children }: { title?: ReactNode } & C) => (
  <div className="col">{title && <h3>{title}</h3>}{children}</div>
);

export const Tags = ({ children }: C) => <div className="tags">{children}</div>;
export const Tag = ({ children }: C) => <span className="tag">{children}</span>;

export const QuoteBlock = ({ children, cite }: { cite?: ReactNode } & C) => (
  <blockquote className="quote">{children}{cite && <cite>{cite}</cite>}</blockquote>
);

export const Figure = ({ src, alt }: { src: string; alt: string }) => <img className="figure" src={asset(src)} alt={alt} loading="eager" />;

export const DataTable = ({ children, title }: { title?: ReactNode } & C) => (
  <div className="data-table">{title && <div className="dt-title">{title}</div>}<table>{children}</table></div>
);

export function Formula({ label, children }: { label: string } & C) {
  return <div className="formula"><div className="fl">{label}</div><code>{children}</code></div>;
}

/** Numbered steps; also used for task instructions. */
export const Steps = ({ children, cols = 2 }: { cols?: number } & C) => (
  <div className="agenda steps" style={{ ['--cols' as string]: cols } as CSSProperties}>{children}</div>
);
export const Step = ({ n, title, children }: { n: number | string; title: ReactNode } & C) => (
  <div className="item"><div className="n">{n}</div><div><div className="t">{title}</div><div className="d">{children}</div></div></div>
);

export const StepHead = ({ children }: C) => <div className="task-head">{children}</div>;

/** Row of character tiles with their position underneath (string-function diagrams). */
/** Deretan karakter berindeks. `mark` = [dari, sampai] (1-based, inklusif) untuk menyorot bagian yang diambil LEFT/MID/RIGHT. */
export const CharStrip = ({ items, mark }: { items: [string, string][]; mark?: [number, number] }) => (
  <div className="charstrip">{items.map(([ch, i], k) => (
    <div key={k}><span className={`ch ${mark && k + 1 >= mark[0] && k + 1 <= mark[1] ? 'on' : mark ? 'off' : ''}`}>{ch}</span><span className="ix">{i}</span></div>
  ))}</div>
);

export const TimelineBlock = ({ children }: C) => (
  <div className="timeline" style={{ ['--cols' as string]: Children.count(children) } as CSSProperties}>{children}</div>
);
export const TimelineItem = ({ icon, era, active, children }: { icon?: string; era: ReactNode; active?: boolean } & C) => (
  <div className={`tl ${active ? 'active' : ''}`}>
    <div className="dot">{icon && <Icon name={icon} size={24} />}</div>
    <div className="era">{era}</div>{children}
  </div>
);

/** Countdown timer for recap-deck quizzes (default 50 minutes). */
export function Timer({ minutes = 50, note }: { minutes?: number; note?: ReactNode }) {
  const total = minutes * 60;
  const [left, setLeft] = useState(total);
  const [running, setRunning] = useState(false);
  const iv = useRef<number>(0);
  useEffect(() => {
    if (!running) return;
    iv.current = window.setInterval(() => setLeft((s) => (s <= 1 ? (setRunning(false), 0) : s - 1)), 1000);
    return () => window.clearInterval(iv.current);
  }, [running]);
  const mm = String(Math.floor(left / 60)).padStart(2, '0'), ss = String(left % 60).padStart(2, '0');
  const R = 120, CIRC = 2 * Math.PI * R;
  return (
    <div className="timer">
      <div className="ring">
        <svg viewBox="0 0 280 280" aria-hidden="true">
          <circle cx="140" cy="140" r={R} className="track" />
          <circle cx="140" cy="140" r={R} className="bar" strokeDasharray={CIRC} strokeDashoffset={CIRC * (1 - left / total)} />
        </svg>
        <div className="read"><div className="time" role="timer">{mm}:{ss}</div><div className="unit">menit</div></div>
      </div>
      <div className="tbtns">
        <button type="button" className="primary" onClick={() => setRunning(true)}>Mulai</button>
        <button type="button" onClick={() => setRunning(false)}>Jeda</button>
        <button type="button" onClick={() => { setRunning(false); setLeft(total); }}>Reset</button>
      </div>
      {note && <p className="para caption">{note}</p>}
    </div>
  );
}

/** Padanan menu between the main app and its backup (e.g. Google Docs ↔ Microsoft Word). */
export function EquivTable({ main, backup, rows }: { main: string; backup: string; rows: [ReactNode, ReactNode, ReactNode][] }) {
  return (
    <div className={`data-table equiv ${rows.length > 8 ? 'dense' : ''}`}>
      <table>
        <thead><tr><th>Fitur</th><th>{main} <span className="role">utama</span></th><th>{backup} <span className="role">cadangan</span></th></tr></thead>
        <tbody>{rows.map(([f, a, c], i) => <tr key={i}><td>{f}</td><td>{a}</td><td>{c}</td></tr>)}</tbody>
      </table>
    </div>
  );
}

/** Download button for a generated support file (see scripts/gen-files.mjs). Files open in Google Docs/Sheets and Word/Excel. */
export function Download({ file }: { file: string }) {
  const f = FILES[file];
  if (!f) throw new Error(`Unknown support file: ${file}`);
  const size = f.bytes < 1024 * 1024 ? `${Math.max(1, Math.round(f.bytes / 1024))} KB` : `${(f.bytes / 1048576).toFixed(1)} MB`;
  return (
    <a className="download" href={`./files/${f.file}`} download={f.file}>
      <span className="dl-ico"><Icon name={f.kind === 'DOCX' ? 'description' : 'table_chart'} size={32} /></span>
      <span className="dl-txt"><strong>{f.label}</strong><span>{f.desc}</span><span className="dl-meta">{f.kind} · {size} · {f.file}</span></span>
      <span className="dl-btn"><Icon name="download" size={24} /> Unduh</span>
    </a>
  );
}

/** Task intro: the assignment callout next to its download card. */
export const TaskHead = ({ children }: C) => <div className="taskhead">{children}</div>;

/* ---- Ilustrasi lembar kerja (Pertemuan 11–13) ---- */
export type SheetCell = ReactNode | { v: ReactNode; c?: string };
const cellObj = (x: SheetCell): { v: ReactNode; c: string } =>
  x !== null && typeof x === 'object' && 'v' in (x as object) && !('props' in (x as object)) ? { v: (x as { v: ReactNode }).v, c: (x as { c?: string }).c ?? '' } : { v: x as ReactNode, c: '' };

/** Tiruan lembar kerja. Baris pertama = judul kolom. `c` pada sel: key (kunci dicari), found (baris/kolom yang cocok), res (hasil), fx (rumus), lock, edit, err, num, dim. `rowNums` kustom memperlihatkan baris yang disembunyikan filter. */
export function SheetGrid({ cols, rows, rowNums, caption }: { cols: string[]; rows: SheetCell[][]; rowNums?: number[]; caption?: ReactNode }) {
  return (
    <figure className="sheet">
      <table>
        <thead><tr><th className="corner" />{cols.map((c) => <th key={c}>{c}</th>)}</tr></thead>
        <tbody>{rows.map((r, i) => {
          const n = rowNums ? rowNums[i] : i + 1;
          const jump = !!rowNums && i > 0 && n !== rowNums[i - 1] + 1;
          return (
            <tr key={i} className={`${i === 0 ? 'hd' : ''} ${jump ? 'jump' : ''}`}>
              <th className="rn">{n}</th>
              {r.map((cell, j) => { const o = cellObj(cell); return <td key={j} className={o.c}>{o.v}</td>; })}
            </tr>
          );
        })}</tbody>
      </table>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
/** Beberapa ilustrasi berdampingan, masing-masing dengan judul kecil. */
export const SheetGroup = ({ children }: C) => (
  <div className="sheetgroup" style={{ ['--n' as string]: Children.count(children) } as CSSProperties}>{children}</div>
);
/** Gelembung tiruan: kotak daftar dropdown, pesan galat, atau bilah rumus. */
export const MockPop = ({ tone, children }: { tone?: 'err' | 'ok' | 'fx' } & C) => <div className={`mockpop ${tone ?? ''}`}>{children}</div>;
/** Panel area pivot (Filters, Columns, Rows, Values). */
export const PivotAreas = ({ filters, columns, rows, values }: { filters?: ReactNode; columns?: ReactNode; rows?: ReactNode; values?: ReactNode }) => (
  <div className="pvareas">
    {([['Filters', filters, 'filter_alt'], ['Columns', columns, 'view_column'], ['Rows', rows, 'table_rows'], ['Values', values, 'functions']] as [string, ReactNode, string][]).map(([t, v, ic]) => (
      <div className="pv-box" key={t}><div className="pv-t"><Icon name={ic} size={22} /> {t}</div>{v ? <span className="pv-chip">{v}</span> : <span className="pv-empty">kosong</span>}</div>
    ))}
  </div>
);

/* ---- Ilustrasi dokumen (Pertemuan 9–10) ---- */
/** Tiruan halaman dokumen putih. `w` = lebar px; `orient` portrait (A4) atau landscape. Isi: `<DocLines />`, `<b className="dp-h1">`, `<ins>`/`<del>`, dll. */
export function DocPage({ w = 220, orient = 'portrait', header, footer, wm, bordered, caption, children }: {
  w?: number; orient?: 'portrait' | 'landscape'; header?: ReactNode; footer?: ReactNode; wm?: string; bordered?: boolean; caption?: ReactNode;
} & C) {
  return (
    <figure className="docfig" style={{ width: w }}>
      <div className={`docpage ${orient} ${bordered ? 'bordered' : ''}`}>
        {header && <div className="dp-head">{header}</div>}
        <div className="dp-body">{children}</div>
        {footer && <div className="dp-foot">{footer}</div>}
        {wm && <span className="dp-wm">{wm}</span>}
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
/** Baris teks tiruan (batang abu-abu). `pattern` = lebar tiap baris dalam persen. */
export const DocLines = ({ pattern = [100, 100, 100, 60] }: { pattern?: number[] }) => (
  <>{pattern.map((p, i) => <i key={i} style={{ width: `${p}%` }} />)}</>
);
/** Beberapa halaman/ilustrasi dokumen berdampingan (rata tengah). */
export const DocRow = ({ children }: C) => <div className="docrow">{children}</div>;
/** Perbandingan ukuran kertas dalam skala (cm → px). */
export function PaperSizes() {
  const k = 10; // px per cm
  const sizes: { n: string; w: number; h: number; c: string }[] = [
    { n: 'A4 21 × 29,7 cm', w: 21, h: 29.7, c: '#1a73e8' }, { n: 'Letter 21,6 × 27,9 cm', w: 21.6, h: 27.9, c: '#e8710a' }, { n: 'F4 21,5 × 33 cm', w: 21.5, h: 33, c: '#1e8e3e' },
  ];
  return (
    <figure className="papers">
      <div className="paperstack" style={{ width: 22 * k, height: 33.5 * k }}>
        {sizes.map((s) => <span key={s.n} style={{ width: s.w * k, height: s.h * k, borderColor: s.c }} />)}
      </div>
      <figcaption>{sizes.map((s) => <span key={s.n} className="pp-leg" style={{ color: s.c }}>■ {s.n}</span>)}</figcaption>
    </figure>
  );
}

/* ---- Deck review (7 & 15): panel rangkuman per pertemuan ---- */
/** Panel rangkuman satu pertemuan: lencana nomor + judul + daftar poin berikon centang. */
export function RecapPanel({ n, title, tone, items }: { n: number | string; title: ReactNode; tone?: 'secondary' | 'tertiary'; items: ReactNode[] }) {
  return (
    <div className={`recap ${tone ? 't-' + tone : ''}`}>
      <header><span className="rn">{n}</span><div><small>Pertemuan {n}</small><h3>{title}</h3></div></header>
      <ul>{items.map((it, i) => <li key={i}><Icon name="check_circle" size={24} fill={1} /><span>{it}</span></li>)}</ul>
    </div>
  );
}
export const RecapGrid = ({ children }: C) => <div className="recapgrid">{children}</div>;
