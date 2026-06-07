import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'framer-motion': path.resolve(__dirname, './src/mock-framer-motion.jsx')
    }
  },
  server: { port: 5173, open: true },
});
