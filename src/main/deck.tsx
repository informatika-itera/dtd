import { lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { DeckShell } from '../deck-shell/DeckShell';

const decks: Record<string, ReturnType<typeof lazy>> = {
  '1': lazy(() => import('../decks/pertemuan-01')),
  '2': lazy(() => import('../decks/pertemuan-02')),
  '3': lazy(() => import('../decks/pertemuan-03')),
  '4': lazy(() => import('../decks/pertemuan-04')),
  '5': lazy(() => import('../decks/pertemuan-05')),
  '6': lazy(() => import('../decks/pertemuan-06')),
  '7': lazy(() => import('../decks/pertemuan-07')),
  '9': lazy(() => import('../decks/pertemuan-09')),
  '10': lazy(() => import('../decks/pertemuan-10')),
  '11': lazy(() => import('../decks/pertemuan-11')),
  '12': lazy(() => import('../decks/pertemuan-12')),
  '13': lazy(() => import('../decks/pertemuan-13')),
  '14': lazy(() => import('../decks/pertemuan-14')),
  '15': lazy(() => import('../decks/pertemuan-15')),
};

const id = document.documentElement.dataset.deck ?? '';
const Content = decks[id];

createRoot(document.getElementById('root')!).render(
  Content ? (
    <Suspense fallback={null}>
      <DeckShell><Content /></DeckShell>
    </Suspense>
  ) : <p>Deck tidak ditemukan: {id}</p>,
);
