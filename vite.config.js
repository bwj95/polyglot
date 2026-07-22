import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // Relative asset paths so the build works no matter what subpath
  // GitHub Pages serves it from (e.g. username.github.io/polyglot/).
  // Safe here because the app is a single page with no client-side routing.
  base: './',
  plugins: [react()],
});
