import type { RatioMode } from './canvas';

export type ThemeMode = 'auto' | 'light' | 'dark';
const KEY = 'dtd.view';

export type MeetingFilter = 'all' | 'pra' | 'pasca';
type Stored = { ratio?: RatioMode; theme?: ThemeMode; filter?: MeetingFilter };

const read = (): Stored => {
  try { return JSON.parse(localStorage.getItem(KEY) ?? '{}'); } catch { return {}; }
};
export const savePrefs = (patch: Stored) => {
  try { localStorage.setItem(KEY, JSON.stringify({ ...read(), ...patch })); } catch { /* storage unavailable */ }
};

const oneOf = <T extends string>(v: string | null | undefined, opts: readonly T[]): T | undefined =>
  opts.includes(v as T) ? (v as T) : undefined;

/** URL (?ratio=, ?theme=) beats saved preference beats auto. */
export function initialPrefs(): { ratio: RatioMode; theme: ThemeMode } {
  const q = new URLSearchParams(window.location.search);
  const saved = read();
  return {
    ratio: oneOf(q.get('ratio'), ['auto', '16x9', '4x3'] as const) ?? saved.ratio ?? 'auto',
    theme: oneOf(q.get('theme'), ['auto', 'light', 'dark'] as const) ?? saved.theme ?? 'auto',
  };
}

/** Dashboard filter (before / after UTS) remembered between visits. */
export function initialFilter(): MeetingFilter {
  return oneOf(read().filter, ['all', 'pra', 'pasca'] as const) ?? 'all';
}
