import { createContext, useContext } from 'react';

export const CANVAS_W = 1280;
export const CANVAS_16x9 = { w: CANVAS_W, h: 720 } as const;
export const CANVAS_4x3 = { w: CANVAS_W, h: 960 } as const;
export type Canvas = { w: number; h: number };
export type RatioMode = 'auto' | '16x9' | '4x3';

/** Auto: narrow viewports (4:3 projectors, tablets) get a taller canvas instead of letterboxed bars. */
export function pickCanvas(mode: RatioMode): Canvas {
  if (window.location.search.includes('print-pdf')) return CANVAS_16x9;
  if (mode === '4x3') return CANVAS_4x3;
  if (mode === '16x9') return CANVAS_16x9;
  return window.innerWidth / window.innerHeight < 1.45 ? CANVAS_4x3 : CANVAS_16x9;
}

export const CanvasContext = createContext<Canvas>(CANVAS_16x9);
export const useCanvas = () => useContext(CanvasContext);
