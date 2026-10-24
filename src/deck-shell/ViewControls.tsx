import { Icon } from '../ui';
import './view-controls.css';
import type { RatioMode } from './canvas';
import type { ThemeMode } from './viewPrefs';

const RATIOS: { id: RatioMode; label: string }[] = [
  { id: 'auto', label: 'Otomatis' }, { id: '16x9', label: '16:9' }, { id: '4x3', label: '4:3' },
];
const THEMES: { id: ThemeMode; label: string; icon: string }[] = [
  { id: 'auto', label: 'Otomatis', icon: 'contrast' }, { id: 'light', label: 'Terang', icon: 'light_mode' }, { id: 'dark', label: 'Gelap', icon: 'dark_mode' },
];

type Props = {
  ratio?: RatioMode; theme: ThemeMode; onRatio?: (r: RatioMode) => void; onTheme: (t: ThemeMode) => void;
  /** always fully visible (dashboard) instead of fading until hovered */
  solid?: boolean;
  ratioHint?: string;
};

/** Semi-transparent presenter controls; fade in on hover/focus. Hidden when printing. */
export function ViewControls({ ratio, theme, onRatio, onTheme, solid, ratioHint }: Props) {
  const next = <T extends { id: string }>(list: T[], cur: string) => list[(list.findIndex((x) => x.id === cur) + 1) % list.length];
  const r = RATIOS.find((x) => x.id === ratio);
  const t = THEMES.find((x) => x.id === theme)!;
  return (
    <div className={`view-controls ${solid ? 'solid' : ''}`} role="toolbar" aria-label="Tampilan slide">
      {r && ratio && onRatio && (
        <button type="button" onClick={() => onRatio(next(RATIOS, ratio).id as RatioMode)} title={`Rasio slide: ${r.label}${ratioHint ? ` — ${ratioHint}` : ''} (klik untuk ganti)`}>
          <Icon name="aspect_ratio" size={20} /> <span>{solid ? `Rasio: ${r.label}` : r.label}</span>
        </button>
      )}
      <button type="button" onClick={() => onTheme(next(THEMES, theme).id as ThemeMode)} title={`Tema: ${t.label} (klik untuk ganti)`}>
        <Icon name={t.icon} size={20} /> <span>{solid ? `Tema: ${t.label}` : t.label}</span>
      </button>
    </div>
  );
}
