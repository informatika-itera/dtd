import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { readdirSync } from 'node:fs';
import { resolve } from 'node:path';

// slides/ is the Vite root: every slides/*.html is a page (index = dashboard, pertemuan-N = decks)
// and is published flat, e.g. /pertemuan-1.html. Sources live in src/, images in assets/.
const root = resolve(import.meta.dirname, 'slides');
// gallery.html is a dev-only design preview; it is not part of the published build
const pages = readdirSync(root).filter((f) => f.endsWith('.html') && f !== 'gallery.html');
const entries = Object.fromEntries(pages.map((f) => [f.replace('.html', ''), resolve(root, f)]));

export default defineConfig({
  root,
  plugins: [react()],
  base: './',
  server: { port: 8931, host: '127.0.0.1', fs: { allow: [resolve(import.meta.dirname)] } },
  build: { outDir: resolve(import.meta.dirname, 'dist'), emptyOutDir: true, rollupOptions: { input: entries } },
});
