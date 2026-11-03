import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

// Multi-página: a página de links fica na raiz (bio do Instagram) e cada landing tem seu próprio HTML.
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        links: resolve(__dirname, 'index.html'),
        face: resolve(__dirname, 'face/index.html'),
        corporal: resolve(__dirname, 'corporal/index.html'),
        privacidade: resolve(__dirname, 'privacidade/index.html'),
      },
    },
  },
});
