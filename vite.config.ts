import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import path from 'path';
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
  },

  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: 'public/.well-known/assetlinks.json',
          dest: '.well-known',
        },
      ],
    }),
    VitePWA({
      registerType: 'prompt',
      injectRegister: false,

      pwaAssets: {
        disabled: false,
        config: true,
      },

      manifest: {
        name: 'Pocket KAI',
        short_name: 'Pocket KAI',
        description: 'Веб-приложение для просмотра расписания КНИТУ-КАИ',
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
            src: '/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
        screenshots: [
          {
            src: '/screenshots/1.jpg',
            sizes: '1080x1920',
            type: 'image/jpeg',
          },
          {
            src: '/screenshots/2.jpg',
            sizes: '1080x1920',
            type: 'image/jpeg',
          },
          {
            src: '/screenshots/3.jpg',
            sizes: '1080x1920',
            type: 'image/jpeg',
          },
          {
            src: '/screenshots/4.jpg',
            sizes: '1080x1920',
            type: 'image/jpeg',
          },
          {
            src: '/screenshots/5.jpg',
            sizes: '1080x1920',
            type: 'image/jpeg',
          },
        ],
      },

      workbox: {
        runtimeCaching: [
          {
            urlPattern:
              /^https:\/\/pocket-kai\.ru\/.*\.(js|css|html|svg|png|ico)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'pocket-kai-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 30 * 24 * 60 * 60,
              },
            },
          },
          {
            urlPattern:
              /^https:\/\/pocket-kai-frontend\.vercel\.app\/.*\.(js|css|html|svg|png|ico)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'pocket-kai-dev-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 30 * 24 * 60 * 60,
              },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
          },
          {
            urlPattern: /^https:\/\/api\.pocket-kai\.ru\/.*$/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'pocket-kai-api-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 7 * 24 * 60 * 60,
              },
            },
          },
        ],
        globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
      },
      devOptions: {
        enabled: false,
        navigateFallback: 'index.html',
        suppressWarnings: true,
        type: 'module',
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
