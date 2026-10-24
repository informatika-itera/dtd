// Procedural brush-stroke backdrop. Deterministic per seed (meeting number) so each cover is distinct but stable.
// Strokes are rejected when they would touch an "avoid" rectangle (logos, and on the dashboard hero also the text block).
import { useLayoutEffect, useRef, useState } from 'react';
import { useCanvas } from '../deck-shell/canvas';

const CANVAS_W = 1280;

function rng(seed: number) {
  let a = (seed * 0x9e3779b1) >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export type Rect = { x: number; y: number; w: number; h: number };
type Pt = [number, number];
type Stroke = { d: string; centre: Pt[]; half: number };

/** Closed smooth path from left/right offsets of a curved centerline with tapering width. */
function makeStroke(r: () => number, x: number, y: number, angle: number, len: number, width: number, bend: number): Stroke {
  const n = 14, left: Pt[] = [], right: Pt[] = [], centre: Pt[] = [];
  let px = x, py = y, a = angle;
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const taper = Math.pow(Math.sin(Math.PI * Math.min(1, t * 0.92 + 0.04)), 0.7);
    const w = (width / 2) * taper * (0.85 + r() * 0.3);
    const nx = -Math.sin(a), ny = Math.cos(a);
    left.push([px + nx * w, py + ny * w]);
    right.push([px - nx * w, py - ny * w]);
    centre.push([px, py]);
    a += bend / n + (r() - 0.5) * 0.05;
    px += (Math.cos(a) * len) / n;
    py += (Math.sin(a) * len) / n;
  }
  const pts = [...left, ...right.reverse()];
  const mid = (p: Pt, q: Pt): Pt => [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
  let d = `M${mid(pts[pts.length - 1], pts[0]).map((v) => v.toFixed(1)).join(' ')}`;
  for (let i = 0; i < pts.length; i++) {
    const m = mid(pts[i], pts[(i + 1) % pts.length]);
    d += ` Q${pts[i][0].toFixed(1)} ${pts[i][1].toFixed(1)} ${m[0].toFixed(1)} ${m[1].toFixed(1)}`;
  }
  return { d: d + 'Z', centre, half: width / 2 };
}

/** True if the stroke body (centerline sampled densely, plus its half-width and the filter's jitter) reaches the rect. */
function hits(s: Stroke, rects: Rect[]): boolean {
  const jitter = 10;
  for (let i = 0; i < s.centre.length - 1; i++) {
    for (let k = 0; k < 4; k++) {
      const x = s.centre[i][0] + ((s.centre[i + 1][0] - s.centre[i][0]) * k) / 4;
      const y = s.centre[i][1] + ((s.centre[i + 1][1] - s.centre[i][1]) * k) / 4;
      for (const r of rects) {
        const dx = Math.max(r.x - x, 0, x - (r.x + r.w)), dy = Math.max(r.y - y, 0, y - (r.y + r.h));
        if (Math.hypot(dx, dy) < s.half + jitter) return true;
      }
    }
  }
  return false;
}

const TONES = [
  'var(--md-sys-color-primary-container)',
  'var(--md-sys-color-secondary-container)',
  'var(--md-sys-color-tertiary-container)',
  'var(--md-sys-color-brand-rausch)',
];
const TONES_BOLD = [
  'var(--md-sys-color-primary)',
  'var(--md-sys-color-secondary)',
  'var(--md-sys-color-tertiary)',
  'var(--md-sys-color-brand-rausch)',
];

function makeStrokes(seed: number, bold: boolean, W: number, H: number, avoid: Rect[], tight: Rect[]) {
  const r = rng(seed + 11);
  const order = [0, 1, 2, 3].sort(() => r() - 0.5);
  const count = bold ? 7 + Math.floor(r() * 3) : 5 + Math.floor(r() * 3);
  const k = W / CANVAS_W;
  const out: { d: string; fill: string; opacity: number }[] = [];
  if (bold) {
    // corner accent hugging the top-left edge, so the composition is not only on the right (uses the tighter clearance)
    for (let tries = 0; tries < 60; tries++) {
      const len = (0.14 + r() * 0.14) * W, width = 26 + r() * 22;
      const s = makeStroke(r, -0.03 * W, (0.03 + r() * 0.07) * H, 0.02 + r() * 0.2, len, width, (r() - 0.5) * 0.5);
      if (hits(s, tight)) continue;
      out.push({ d: s.d, fill: TONES_BOLD[order[0]], opacity: 0.2 + r() * 0.12 });
      break;
    }
  }
  for (let i = 0; i < count; i++) {
    const big = !bold && i < 2;
    const tone = (bold ? TONES_BOLD : TONES)[order[i % 4]];
    for (let tries = 0; tries < 40; tries++) {
      const x = bold ? -0.05 * W + r() * 1.1 * W : (700 + r() * 900) * k;
      const y = -0.1 * H + r() * 1.2 * H;
      const angle = (r() - 0.5) * 1.1 + (r() < 0.5 ? 0 : Math.PI * 0.08);
      const len = bold ? (240 + r() * 420) * k : (big ? 900 + r() * 500 : 420 + r() * 380) * k;
      const width = bold ? 26 + r() * 54 : big ? 120 + r() * 120 : 28 + r() * 46;
      const bend = (r() - 0.5) * 1.2;
      const x0 = x - (big ? 700 : 0) * k;
      const s = makeStroke(r, x0, y, angle, len, width, bend);
      const opacity = bold ? 0.16 + r() * 0.16 : tone.includes('rausch') ? 0.12 + r() * 0.1 : 0.35 + r() * 0.35;
      if (hits(s, avoid)) continue;
      out.push({ d: s.d, fill: tone, opacity });
      break;
    }
  }
  return out;
}

type Props = {
  seed: number;
  /** saturated brand tones, spread over the whole area (dashboard hero) */
  bold?: boolean;
  /** static rectangles to keep clear, in canvas px (covers) */
  avoid?: Rect[];
  /** hero mode: size the canvas to the parent and keep clear of these elements (selector inside the parent, extra clearance px) */
  fitAvoid?: { sel: string; pad: number }[];
};

export function BrushBackground({ seed, bold = false, avoid = [], fitAvoid }: Props) {
  const { h: canvasH } = useCanvas();
  const ref = useRef<SVGSVGElement>(null);
  const [fit, setFit] = useState<{ W: number; H: number; rects: Rect[]; tight: Rect[] } | null>(null);

  useLayoutEffect(() => {
    if (!fitAvoid) return;
    const svg = ref.current, host = svg?.parentElement;
    if (!svg || !host) return;
    const measure = () => {
      const box = svg.getBoundingClientRect();
      if (!box.width || !box.height) return;
      const rects: Rect[] = [], tight: Rect[] = [];
      for (const { sel, pad } of fitAvoid) {
        host.querySelectorAll(sel).forEach((el) => {
          const r = el.getBoundingClientRect();
          if (!r.width || !r.height) return;
          const at = (p: number): Rect => ({ x: r.left - box.left - p, y: r.top - box.top - p, w: r.width + 2 * p, h: r.height + 2 * p });
          rects.push(at(pad));
          tight.push(at(pad / 2));
        });
      }
      setFit((p) => (p && p.W === Math.round(box.width) && p.H === Math.round(box.height) && JSON.stringify(p.rects) === JSON.stringify(rects) ? p : { W: Math.round(box.width), H: Math.round(box.height), rects, tight }));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(host);
    document.fonts?.ready.then(measure);
    return () => ro.disconnect();
  }, [fitAvoid]);

  const W = fit ? fit.W : CANVAS_W, H = fit ? fit.H : canvasH;
  const strokes = fitAvoid && !fit ? [] : makeStrokes(seed, bold, W, H, fit ? fit.rects : avoid, fit ? fit.tight : avoid);
  const f = `brush-${seed}${fitAvoid ? 'f' : ''}`;
  return (
    <svg ref={ref} className="brush-bg" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <filter id={f} x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.012 0.03" numOctaves="2" seed={seed} result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="14" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
      <g filter={`url(#${f})`}>
        {strokes.map((s, i) => <path key={i} d={s.d} fill={s.fill} opacity={s.opacity} />)}
      </g>
    </svg>
  );
}
