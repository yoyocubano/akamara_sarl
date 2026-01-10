import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isProd = mode === 'production';
  return {
    plugins: [
      react(),
      tailwindcss(),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    root: __dirname,
    build: {
      outDir: 'dist',
      emptyOutDir: true,
      sourcemap: isProd ? 'hidden' : true,
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom', 'react-router-dom'],
            'appwrite-vendor': ['appwrite'],
            'ui-vendor': ['lucide-react', 'html2canvas', 'jspdf'],
          },
        },
      },
      chunkSizeWarningLimit: 600,
    },
    server: {
      host: true,
      port: 5173,
      proxy: {
        // Proxy to Appwrite local or containerized instance if needed
        '/api': {
          target: 'http://localhost:80/v1',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
      allowedHosts: [
        '.manuspre.computer',
        '.manus.computer',
        '.manus-asia.computer',
        '.manuscomputer.ai',
        '.manusvm.computer',
        'localhost',
        '127.0.0.1',
      ],
    },
  };
});
