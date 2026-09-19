import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    react(),
    // Vite's library mode emits JS but NO type declarations.
    // Without this plugin, TS consumers of the package get `any`.
    dts({ include: ['src'], insertTypesEntry: true }),
  ],
  build: {
    lib: {
      entry: 'src/index.ts',
      formats: ['es', 'cjs'],
      fileName: (format) => (format === 'es' ? 'index.js' : 'index.cjs'),
    },
    rollupOptions: {
      // Never bundle React. `react/jsx-runtime` is easy to forget and
      // will silently ship a second copy of the JSX runtime if omitted.
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        // One CSS file, predictably named, so consumers can
        // `import 'gantt-chart-component/styles.css'`.
        assetFileNames: 'index.[ext]',
      },
    },
    sourcemap: true,
  },
});
