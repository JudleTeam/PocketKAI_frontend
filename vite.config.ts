import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
  },

  plugins: [
    react(),
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
