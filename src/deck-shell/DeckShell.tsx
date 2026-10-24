import { useEffect, useLayoutEffect, useState, type ReactNode } from 'react';
import { Deck } from '@revealjs/react';
import RevealNotes from 'reveal.js/plugin/notes';
import RevealZoom from 'reveal.js/plugin/zoom';
import RevealSearch from 'reveal.js/plugin/search';
import RevealHighlight from 'reveal.js/plugin/highlight';
import { CanvasContext, pickCanvas, type RatioMode } from './canvas';
import { ViewControls } from './ViewControls';
import { initialPrefs, savePrefs, type ThemeMode } from './viewPrefs';
import '../theme';
import '../theme/deck';

export function DeckShell({ children }: { children: ReactNode }) {
  const print = window.location.search.includes('print-pdf');
  // ?print-pdf opens the browser's print dialog once layout, fonts and images are ready (add &noprint to skip, e.g. in tests)
  const autoPrint = print && !window.location.search.includes('noprint');
  const [prefs] = useState(initialPrefs);
  const [ratio, setRatio] = useState<RatioMode>(prefs.ratio);
  const [theme, setTheme] = useState<ThemeMode>(prefs.theme);
  const [canvas, setCanvas] = useState(() => pickCanvas(prefs.ratio));

  useLayoutEffect(() => { document.documentElement.dataset.theme = theme; }, [theme]);
  useLayoutEffect(() => { document.documentElement.dataset.ratio = canvas.h > 720 ? '4x3' : '16x9'; }, [canvas.h]);

  useEffect(() => {
    let t: number;
    const apply = () => setCanvas((c) => { const n = pickCanvas(ratio); return n.h === c.h ? c : n; });
    apply();
    const onResize = () => { window.clearTimeout(t); t = window.setTimeout(apply, 150); };
    window.addEventListener('resize', onResize);
    return () => { window.clearTimeout(t); window.removeEventListener('resize', onResize); };
  }, [ratio]);

  return (
    <CanvasContext.Provider value={canvas}>
      <Deck
        config={{
          width: canvas.w, height: canvas.h, margin: 0, minScale: 0.2, maxScale: 2,
          center: false, hash: true, transition: 'none', slideNumber: 'c/t',
          controls: !print, controlsLayout: 'edges', progress: !print, pdfMaxPagesPerSlide: 1,
        }}
        plugins={[RevealNotes, RevealZoom, RevealSearch, RevealHighlight]}
        onReady={() => {
          if (!autoPrint) return;
          const imgs = [...document.images].map((i) => (i.complete ? null : new Promise((r) => { i.onload = i.onerror = r; })));
          Promise.all([document.fonts.ready, ...imgs]).then(() => window.setTimeout(() => window.print(), 800));
        }}
      >
        {children}
      </Deck>
      {!print && (
        <ViewControls
          ratio={ratio} theme={theme}
          onRatio={(r) => { setRatio(r); savePrefs({ ratio: r }); }}
          onTheme={(t) => { setTheme(t); savePrefs({ theme: t }); }}
        />
      )}
    </CanvasContext.Provider>
  );
}
