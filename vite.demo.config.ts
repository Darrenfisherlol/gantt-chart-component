import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Builds the demo page (index.html -> dev/main.tsx) as a normal app for GitHub Pages.
// The library build lives in vite.config.ts.
export default defineConfig({
  plugins: [react()],
  // Pages serves the repo at /<repo-name>/
  base: '/gantt-chart-component/',
  build: {
    outDir: 'demo-dist',
  },
});
