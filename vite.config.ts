import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import { visualizer } from 'rollup-plugin-visualizer';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  plugins: [
    react({
      babel: {
        plugins: [
          ['@babel/plugin-transform-react-jsx', { runtime: 'automatic' }]
        ]
      }
    }),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'Tafara Mutsvedu - Software Developer & Data Scientist',
        short_name: 'Tafara Mutsvedu',
        description: 'Expert Software Developer and Data Scientist based in South Africa',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        icons: [
          {
            src: '/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/apple-touch-icon.png',
            sizes: '180x180',
            type: 'image/png',
            purpose: 'apple touch icon',
          },
        ],
      },
    }),
    visualizer({
      open: false,
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        passes: 2,
        ecma: 2020,
      },
      format: {
        comments: false,
        ecma: 2020,
      }
    },
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Core libraries
          if (id.includes('node_modules/react') || 
              id.includes('node_modules/react-dom')) {
            return 'react-core';
          }
          // Routing
          if (id.includes('node_modules/react-router') || 
              id.includes('node_modules/react-router-dom')) {
            return 'routing';
          }
          // UI components
          if (id.includes('node_modules/lucide-react') || 
              id.includes('node_modules/framer-motion')) {
            return 'ui';
          }
          // Other dependencies
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: ({ name }) => {
          if (/\.(gif|jpe?g|png|svg|webp)$/.test(name ?? '')) {
            return 'assets/images/[name]-[hash][extname]';
          }
          if (/\.css$/.test(name ?? '')) {
            return 'assets/css/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        }
      },
    },
    sourcemap: false,
    cssCodeSplit: true,
    assetsInlineLimit: 4096, // 4kb - files smaller than this will be inlined as base64
    reportCompressedSize: false, // Improves build performance
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    exclude: ['lucide-react'],
  },
});
