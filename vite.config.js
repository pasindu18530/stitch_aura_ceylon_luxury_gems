import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    entries: ['index.html'],
    include: ['react', 'react/jsx-runtime', 'react-dom', 'react-dom/client', 'react-router-dom'],
    force: true
  },
  server: {
    port: 5173,
    open: true,
    fs: {
      strict: false
    }
  }
});
