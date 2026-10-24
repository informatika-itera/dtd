import { useLayoutEffect, useRef } from 'react';

/** Scale font-size down (from max to min px) until the text fits on a single line. */
export function useFitText<T extends HTMLElement>(max: number, min: number, dep: string) {
  const ref = useRef<T>(null);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fit = () => {
      el.style.fontSize = `${max}px`;
      // measured on the unscaled layout box (reveal scales via transform, so offsets are canvas px)
      const avail = el.parentElement!.clientWidth;
      const w = el.scrollWidth;
      if (w > avail) el.style.fontSize = `${Math.max(min, Math.floor((max * avail) / w))}px`;
    };
    fit();
    document.fonts.ready.then(fit);
  }, [max, min, dep]);
  return ref;
}
