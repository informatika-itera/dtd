import type { ReactNode } from 'react';
import { Slide } from '@revealjs/react';
import { Icon } from '../ui';
import { BrushBackground } from '../ui/BrushBackground';
import { useFitText } from '../ui/useFitText';
import { asset } from '../ui/assets';
import './layouts.css';

type Common = { notes?: string; children?: ReactNode };

// top-right logo area of the cover (canvas px, incl. clearance): brush strokes stay out of it
const LOGO_ZONE = [{ x: 940, y: 0, w: 340, h: 150 }];

export function Page({ cls = '', notes, children }: { cls?: string } & Common) {
  return <Slide className={`page ${cls}`} notes={notes}><div className="inner">{children}</div></Slide>;
}

export function TitleSlide({ title, lede, meeting, logos = true, notes }: { title: string; lede: string; meeting: number } & Common & { logos?: boolean }) {
  const h1 = useFitText<HTMLHeadingElement>(64, 40, title);
  return (
    <Page cls="title" notes={notes}>
      <BrushBackground seed={meeting} avoid={LOGO_ZONE} />
      {logos && <div className="logos">
        <img src={asset('dikti-saintek-1.png')} alt="DIKTI Saintek Berdampak" />
        <img src={asset('itera-1.png')} alt="ITERA" />
      </div>}
      <div className="kicker">
        <span className="no">{String(meeting).padStart(2, '0')}</span>
        <span className="rule" />
        <span className="course">Dasar Teknologi Digital<br />Pertemuan {meeting}</span>
      </div>
      <h1 ref={h1}>{title}</h1>
      <p className="lede">{lede}</p>
    </Page>
  );
}

/** Pemicu. Bentuknya sengaja berbeda tiap pertemuan: pakai `stats`/`examples`, atau `children` (diagram, tabel, skenario, dll.). */
export function HookSlide({ title, lede, stats, examples, source, notes, children }: {
  title: string; lede?: ReactNode; stats?: { num: string; label: ReactNode }[]; examples?: ReactNode[]; source?: string;
} & Common) {
  return (
    <Page cls="hook" notes={notes}>
      <h2>{title}</h2>
      {lede && <p className="lede">{lede}</p>}
      {stats && <div className="stats">{stats.map((s, i) => (
        <div className="stat" key={i}><div className="num">{s.num}</div><div className="lab">{s.label}</div></div>
      ))}</div>}
      {children}
      {examples && <ul className="examples">{examples.map((e, i) => <li key={i}><span>{e}</span></li>)}</ul>}
      {source && <p className="caption">Sumber: {source}</p>}
    </Page>
  );
}

/** Pembatas bagian — sederhana dan seragam di semua deck: nomor, judul, satu baris deskripsi, dan bilah posisi. */
export function SectionSlide({ part, of, title, desc, notes }: { part: number; of: number; title: string; desc: ReactNode; notes?: string }) {
  return (
    <Page cls="section" notes={notes}>
      <div className="sec-simple">
        <div className="sec-no"><span>{String(part).padStart(2, '0')}</span><small>dari {String(of).padStart(2, '0')}</small></div>
        <div className="sec-text">
          <h2>{title}</h2>
          <p className="sec-desc">{desc}</p>
        </div>
      </div>
      <div className="sec-bar" role="img" aria-label={`Bagian ${part} dari ${of}`}>{Array.from({ length: of }, (_, k) => <span key={k} className={k < part ? 'on' : ''} />)}</div>
    </Page>
  );
}

export function AgendaSlide({ title, items, notes }: { title: string; items: { title: string; desc: string }[] } & Common) {
  return (
    <Page notes={notes}>
      <h2>{title}</h2>
      <div className={`agenda ${items.length > 6 ? 'dense' : ''}`}>{items.map((it, i) => (
        <div className="item" key={i}>
          <div className="n">{i + 1}</div>
          <div><div className="t">{it.title}</div><div className="d">{it.desc}</div></div>
        </div>
      ))}</div>
    </Page>
  );
}

export function DiscussSlide({ title, prompts, footer, notes }: { title: string; prompts: { heading: string; icon: string; body: ReactNode }[]; footer: string } & Common) {
  return (
    <Page notes={notes}>
      <h2>{title}</h2>
      <div className="discuss">{prompts.map((p, i) => (
        <div className="surface tonal-secondary" key={i}>
          <h3><Icon name={p.icon} /> {p.heading}</h3><p>{p.body}</p>
        </div>
      ))}</div>
      <div className="callout"><Icon name="timer" size={24} /> {footer}</div>
    </Page>
  );
}

export function TwoColumnSlide({ title, children, image, imageAlt, tags, notes, even }: {
  title: string; image?: string; imageAlt?: string; tags?: string[]; even?: boolean; children: ReactNode; notes?: string;
}) {
  return (
    <Page notes={notes}>
      <h2>{title}</h2>
      <div className={`two ${even ? 'even' : ''}`}>
        <div className="stack">{children}{tags && <div className="tags">{tags.map((t, i) => <span className="tag" key={i}>{t}</span>)}</div>}</div>
        {image && <img src={asset(image)} alt={imageAlt ?? ''} loading="eager" />}
      </div>
    </Page>
  );
}
export const Quote = ({ children, cite }: { children: ReactNode; cite?: ReactNode }) => (
  <blockquote className="quote" style={{ margin: 0 }}>{children}{cite && <cite>{cite}</cite>}</blockquote>
);

export function FlowSlide({ title, lede, nodes, caption, notes }: {
  title: string; lede?: ReactNode; caption?: ReactNode; notes?: string;
  nodes: { icon: string; title: string; body: ReactNode; example?: ReactNode; hi?: boolean }[];
}) {
  return (
    <Page notes={notes}>
      <h2>{title}</h2>
      {lede && <p className="lede">{lede}</p>}
      <div className="flow">{nodes.flatMap((n, i) => [
        i > 0 && <span className="arrow" key={`a${i}`}><Icon name="arrow_forward" size={40} /></span>,
        <div className={`node ${n.hi ? 'hi' : ''}`} key={`n${i}`}>
          <Icon name={n.icon} size={40} /><h3>{n.title}</h3><p>{n.body}</p>{n.example && <em>{n.example}</em>}
        </div>,
      ])}</div>
      {caption && <p className="lede" style={{ fontSize: 24 }}>{caption}</p>}
    </Page>
  );
}

export function CardsSlide({ title, lede, cards, cols = 3, dense, callout, notes }: {
  title: string; lede?: ReactNode; cols?: number; dense?: boolean; callout?: ReactNode; notes?: string;
  cards: { icon: string; title: string; sub?: ReactNode; body?: ReactNode; tone?: 'secondary' | 'tertiary' }[];
}) {
  return (
    <Page notes={notes}>
      <h2>{title}</h2>
      {lede && <p className="lede">{lede}</p>}
      <div className={`cards ${dense ? 'dense' : ''}`} style={{ ['--cols' as string]: cards.length === 4 ? 2 : cols }}>{cards.map((c, i) => (
        <div className={`card ${c.tone ? 't-' + c.tone : ''}`} key={i}>
          <div className="ico"><Icon name={c.icon} size={32} /></div>
          <h3>{c.title}</h3>{c.sub && <div className="sub">{c.sub}</div>}{c.body && <p>{c.body}</p>}
        </div>
      ))}</div>
      {callout && <div className="callout">{callout}</div>}
    </Page>
  );
}

export function TimelineSlide({ title, lede, steps, notes }: { title: string; lede?: ReactNode; steps: { icon: string; era: string; title: string; body: string }[]; notes?: string }) {
  return (
    <Page notes={notes}>
      <h2>{title}</h2>{lede && <p className="lede">{lede}</p>}
      <div className="timeline">{steps.map((s, i) => (
        <div className="tl" key={i}>
          <div className="dot"><Icon name={s.icon} size={24} /></div>
          <div className="era">{s.era}</div><h3>{s.title}</h3><p style={{ fontSize: 22 }}>{s.body}</p>
        </div>
      ))}</div>
    </Page>
  );
}

export function ComparisonSlide({ title, left, right, footer, notes }: {
  title: string; footer?: ReactNode; notes?: string;
  left: { heading: string; icon: string; items: ReactNode[]; tone?: 'pos' | 'neg' | 'neutral' };
  right: { heading: string; icon: string; items: ReactNode[]; tone?: 'pos' | 'neg' | 'neutral' };
}) {
  const col = (c: typeof left, d: 'pos' | 'neg' | 'neutral') => (
    <div className={`panel ${c.tone ?? d}`}>
      <h3><Icon name={c.icon} /> {c.heading}</h3><ul>{c.items.map((x, i) => <li key={i}>{x}</li>)}</ul>
    </div>
  );
  return (
    <Page notes={notes}>
      <h2>{title}</h2>
      <div className="discuss">{col(left, 'pos')}{col(right, 'neg')}</div>
      {footer && <div className="callout">{footer}</div>}
    </Page>
  );
}

export type QuizItem = { q: ReactNode; options: ReactNode[]; answer: number };
const textLen = (n: ReactNode): number => typeof n === 'string' || typeof n === 'number' ? String(n).length
  : Array.isArray(n) ? n.reduce((a: number, c) => a + textLen(c), 0)
  : n && typeof n === 'object' && 'props' in n ? textLen((n.props as { children?: ReactNode }).children) : 0;
/** Satu slide: soal tampil, lalu jawaban benar muncul satu per satu (fragment — tekan → / spasi). PDF mencetak satu halaman per langkah. */
export function QuizSlide({ title, items, notes }: { title: string; items: QuizItem[]; notes?: string }) {
  return (
    <Page notes={notes}>
      <h2>{title}</h2>
      <div className={`quiz ${items.length > 4 ? 'many' : ''} ${items.reduce<number>((a, it) => a + textLen(it.q) + it.options.reduce<number>((b, o) => b + textLen(o), 0), 0) > 480 ? 'long' : ''}`}>{items.map((it, i) => (
        <div className="q" key={i}>
          <div className="q-text">{i + 1}. {it.q}</div>
          <div className="opts">{it.options.map((o, j) => (
            <div className="opt" key={j}>
              {j === it.answer && (
                <span className="fragment fade-in ans-hl" data-fragment-index={i + 1} aria-label="jawaban benar">
                  <Icon name="check_circle" size={22} fill={1} />
                </span>
              )}
              <span className="ot">{'ABCD'[j]}. {o}</span>
            </div>
          ))}</div>
        </div>
      ))}</div>
    </Page>
  );
}

/** Cek cepat di akhir klaster materi: satu soal bukan-post-test; jawaban lalu penjelasan muncul sebagai fragment (→). */
export function QuickCheckSlide({ q, options, answer, why, notes }: { q: ReactNode; options: ReactNode[]; answer: number; why: ReactNode; notes?: string }) {
  return (
    <Page cls="quick" notes={notes}>
      <h2>Cek Cepat</h2>
      <div className="quick-q">{q}</div>
      <div className="quick-opts">{options.map((o, j) => (
        <div className="quick-opt" key={j}>
          {j === answer && (
            <span className="fragment fade-in ans-hl" data-fragment-index={1} aria-label="jawaban benar"><Icon name="check_circle" size={28} fill={1} /></span>
          )}
          <span className="ot"><b>{'ABCD'[j]}.</b> {o}</span>
        </div>
      ))}</div>
      <div className="callout fragment fade-in" data-fragment-index={2}><strong className="ct">Mengapa?</strong><div className="cc">{why}</div></div>
    </Page>
  );
}

export function SummarySlide({ title, points, notes }: { title: string; points: ReactNode[]; notes?: string }) {
  return (
    <Page notes={notes}>
      <h2>{title}</h2>
      <div className="summary">{points.map((p, i) => <div className="s" key={i}><div className="n">{i + 1}</div><div>{p}</div></div>)}</div>
    </Page>
  );
}

export function ReferencesSlide({ refs, notes }: { refs: ReactNode[]; notes?: string }) {
  return (
    <Page cls="refs-page" notes={notes}>
      <div className="refs-head">
        <h2>Referensi</h2>
        <span className="refs-count"><Icon name="menu_book" size={24} /> {refs.length} sumber</span>
      </div>
      <ol className="refs" style={{ ['--rows' as string]: Math.ceil(refs.length / 2) }}>{refs.map((r, i) => (
        <li key={i}><span className="rn">{String(i + 1).padStart(2, '0')}</span><span className="rt">{r}</span></li>
      ))}</ol>
    </Page>
  );
}

/** Penutup ringkas: terima kasih, satu kalimat, satu kutipan, dan satu baris pertemuan berikutnya (topiknya ada di catatan pembicara). */
export function ClosingSlide({ title = 'Terima Kasih', lede, quote, cite, next, notes }: { title?: string; lede: ReactNode; quote: ReactNode; cite: ReactNode; next: string; notes?: string }) {
  const nextNo = /^Pertemuan (\d+):\s*(.*)$/.exec(next);
  return (
    <Page cls="closing" notes={notes}>
      <h1>{title}</h1>
      <p className="lede">{lede}</p>
      <Quote cite={cite}>{quote}</Quote>
      <div className="next-line">
        <span className="label">Berikutnya{nextNo && ` — Pertemuan ${nextNo[1]}`}</span>
        <span className="text"><Icon name="arrow_forward" size={32} /> {nextNo ? nextNo[2] : next}</span>
      </div>
    </Page>
  );
}
