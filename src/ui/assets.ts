const files = import.meta.glob('../../assets/**/*.{jpg,png}', { eager: true, query: '?url', import: 'default' }) as Record<string, string>;

/** Resolve a path relative to /assets, e.g. asset('images/ai-coding.jpg'). */
export function asset(path: string): string {
  const url = files[`../../assets/${path}`];
  if (!url) throw new Error(`Asset not found: ${path}`);
  return url;
}
