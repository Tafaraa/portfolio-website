import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import { visualizer } from 'rollup-plugin-visualizer';
import { resolve } from 'path';

// https://vitejs.dev/config/
// `mode` drives the bundle-analysis opt-in: `npm run build:analyze`.
export default defineConfig(({ mode }) => ({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      // Registered by hand in src/main.tsx so the dashboard entry never ships a
      // service worker registration at all.
      injectRegister: false,
      includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      workbox: {
        // Opening a static file (certificate image, resume, sitemap) in a new
        // tab is a navigation request. Without this denylist the service
        // worker's SPA fallback serves index.html instead of the file.
        // /admin is its own document, not an SPA route, so it must not be
        // answered with the marketing shell either.
        navigateFallbackDenylist: [
          /^\/admin(?:\/|$)/,
          /^\/images\//,
          /\.(?:webp|png|jpe?g|svg|gif|ico|pdf|xml|txt|webmanifest)$/i,
        ],
        // Keep every byte of the dashboard out of the precache manifest.
        // Otherwise the service worker downloads it on a visitor's very first
        // page view, which is exactly what showed up in the network tab.
        globIgnores: ['**/admin.html', '**/assets/js/admin-*.js', '**/assets/css/admin-*.css'],
        cleanupOutdatedCaches: true,
      },
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
    // Writes an ~870 KB stats.html next to the source. Useful when you are
    // actually hunting bundle weight, pure noise on every deploy, so it is
    // opt-in: `npm run build:analyze`.
    mode === 'analyze' &&
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
      // Two independent documents. The dashboard is not a route inside the
      // marketing SPA, so none of its code is reachable from the public bundle.
      input: {
        main: resolve(__dirname, 'index.html'),
        admin: resolve(__dirname, 'admin.html'),
      },
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
}));
