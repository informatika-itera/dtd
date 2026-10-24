import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import '../theme';
import { Icon } from '../ui';
import { asset } from '../ui/assets';
import { BrushBackground } from '../ui/BrushBackground';
import { CanvasContext } from '../deck-shell/canvas';
import { ViewControls } from '../deck-shell/ViewControls';
import type { RatioMode } from '../deck-shell/canvas';
import { initialFilter, initialPrefs, savePrefs, type MeetingFilter, type ThemeMode } from '../deck-shell/viewPrefs';
import { SECTIONS, type Meeting, type MeetingKind } from '../decks/registry';
import './dashboard.css';

const KIND: Record<MeetingKind, { label: string; icon: string }> = {
  teori: { label: 'Teori', icon: 'menu_book' },
  review: { label: 'Review & Kuis', icon: 'quiz' },
  praktikum: { label: 'Praktikum', icon: 'edit_note' },
  ujian: { label: 'Ujian', icon: 'assignment' },
};

function Card({ m }: { m: Meeting }) {
  const live = m.deck && m.published;
  const body = (
    <>
      <div className="head">
        <div className="num">{m.number}</div>
        <span className={`kind k-${m.kind}`}><Icon name={KIND[m.kind].icon} size={20} /> {KIND[m.kind].label}</span>
      </div>
      <h3>{m.title}</h3>
      <p title={m.desc}>{m.desc}</p>
    </>
  );
  if (!live) {
    return (
      <div className="mcard off" aria-disabled="true">
        {body}
        <span className="state">{m.deck ? 'Segera hadir' : 'Tanpa slide'}</span>
      </div>
    );
  }
  return (
    <div className="mcard">
      <a className="open" href={`./pertemuan-${m.number}.html`} aria-label={`Buka slide Pertemuan ${m.number}`}>{body}</a>
      <a className="pdf" href={`./pertemuan-${m.number}.html?print-pdf`} target="_blank" rel="noreferrer" title="Unduh PDF (dialog cetak)" aria-label={`Unduh PDF Pertemuan ${m.number}`}>
        <Icon name="picture_as_pdf" size={22} />
      </a>
    </div>
  );
}

// strokes stay clear of the logos and (with some air) of the heading text
const HERO_AVOID = [{ sel: '.logos', pad: 28 }, { sel: '.kicker, h1, p', pad: 44 }];

const FILTERS: { id: MeetingFilter; label: string }[] = [
  { id: 'all', label: 'Semua' }, { id: 'pra', label: 'Sebelum UTS' }, { id: 'pasca', label: 'Setelah UTS' },
];
const norm = (t: string) => t.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
const haystack = (m: Meeting) => norm(`pertemuan ${m.number} ${m.title} ${m.desc} ${KIND[m.kind].label}`);

function Dashboard() {
  const [theme, setTheme] = useState<ThemeMode>(() => initialPrefs().theme);
  const [ratio, setRatio] = useState<RatioMode>(() => initialPrefs().ratio);
  const [filter, setFilter] = useState<MeetingFilter>(initialFilter);
  const [query, setQuery] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);
  useLayoutEffect(() => { document.documentElement.dataset.theme = theme; }, [theme]);

  const sections = useMemo(() => {
    const terms = norm(query).split(/\s+/).filter(Boolean);
    return SECTIONS.map((sec) => ({
      ...sec,
      meetings: sec.meetings.filter((m) =>
        (filter === 'all' || (filter === 'pra') === (m.number <= 8)) && terms.every((t) => haystack(m).includes(t))),
    })).filter((sec) => sec.meetings.length);
  }, [filter, query]);

  const pickFilter = (f: MeetingFilter) => { setFilter(f); savePrefs({ filter: f }); };

  return (
    <CanvasContext.Provider value={{ w: 1280, h: 400 }}>
      <header className="hero">
        <BrushBackground seed={7} bold fitAvoid={HERO_AVOID} />
        <div className="logos">
          <img src={asset('dikti-saintek-1.png')} alt="DIKTI Saintek Berdampak" />
          <img src={asset('itera-1.png')} alt="ITERA" />
        </div>
        <div className="kicker"><span className="rule" /><span className="course">WI25-00002</span></div>
        <h1>Dasar Teknologi Digital</h1>
        <p>Repositori materi perkuliahan WI25-00002 Institut Teknologi Sumatera</p>
      </header>
      <div className="toolbar" role="search">
        <label className="search">
          <Icon name="search" size={24} />
          <input
            ref={searchRef} type="search" value={query} placeholder="Cari materi, topik, atau nomor pertemuan"
            aria-label="Cari materi" onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Escape') setQuery(''); }}
          />
          {query && <button type="button" className="clear" onClick={() => { setQuery(''); searchRef.current?.focus(); }} aria-label="Hapus pencarian"><Icon name="close" size={22} /></button>}
        </label>
        <div className="chips" role="group" aria-label="Filter pertemuan">
          {FILTERS.map((f) => (
            <button key={f.id} type="button" className={`fchip ${filter === f.id ? 'on' : ''}`} aria-pressed={filter === f.id} onClick={() => pickFilter(f.id)}>
              {filter === f.id && <Icon name="check" size={20} />} {f.label}
            </button>
          ))}
        </div>
      </div>
      <main>
        {sections.map((s) => (
          <section key={s.title}>
            <h2>{s.title}</h2>
            <p className="desc">{s.desc}</p>
            <div className="grid">{s.meetings.map((m) => <Card key={m.number} m={m} />)}</div>
          </section>
        ))}
        {!sections.length && (
          <p className="empty"><Icon name="search_off" size={32} /> Tidak ada materi yang cocok{query && <> dengan “{query}”</>}.</p>
        )}
      </main>
      <footer>Dasar Teknologi Digital · WI25-00002 · Institut Teknologi Sumatera</footer>
      <ViewControls
        solid theme={theme} onTheme={(t) => { setTheme(t); savePrefs({ theme: t }); }}
        ratio={ratio} onRatio={(r) => { setRatio(r); savePrefs({ ratio: r }); }} ratioHint="dipakai saat membuka slide"
      />
    </CanvasContext.Provider>
  );
}

createRoot(document.getElementById('root')!).render(<Dashboard />);
