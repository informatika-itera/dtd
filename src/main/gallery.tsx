import { createRoot } from 'react-dom/client';
import { DeckShell } from '../deck-shell/DeckShell';
import { TitleSlide, Page } from '../layouts';
import { M, MathBlock } from '../ui';

const titles = [
  'Pengenalan Dasar Teknologi Digital', 'Sistem Bilangan Digital & Logika Digital', 'Internet, Website, Basis Data & Media Sosial',
  'Aplikasi & Etika Teknologi Digital', 'Data & Informasi di Era Digital', 'Inovasi, AI & Sustainability',
];

createRoot(document.getElementById('root')!).render(
  <DeckShell>
    {titles.map((t, i) => (
      <TitleSlide key={t} meeting={i + 1} title={t} lede="Contoh cover: goresan kuas berbeda di setiap pertemuan." />
    ))}
    <Page>
      <h2>Matematika dengan KaTeX</h2>
      <p>Rumus inline: <M tex="E = mc^2" /></p>
      <MathBlock tex="\sum_{i=0}^{n-1} b_i \cdot 2^i" />
    </Page>
  </DeckShell>,
);
