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
        disabled: true,
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
              /^https:\/\/pocket-kai\.ru\/.*\.(js|css|html|svg|png|ico|ttf)$/,
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
              /^https:\/\/pocket-kai-frontend\.vercel\.app\/.*\.(js|css|html|svg|png|ico|ttf)$/,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'pocket-kai-dev-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 30 * 24 * 60 * 60,
              },
              plugins: [
                {
                  cacheDidUpdate: async () => {
                    const currentDate = new Date();
                    const year = currentDate.getFullYear();
                    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Добавляем 1, так как месяцы отсчитываются с 0
                    const day = String(currentDate.getDate()).padStart(2, '0'); // Добавляем ведущий ноль, если день меньше 10

                    const currentTime = `${year}-${month}-${day}`;


                    // Отправляем сообщение основному скрипту
                    const clients = await self.clients.matchAll();
                    clients.forEach((client) => {
                      client.postMessage({
                        type: 'UPDATE_TIME',
                        time: currentTime,
                      });
                    });
                  },
                },
              ],
            },
          },
          // API CACHE
          {
            urlPattern: /^https:\/\/api\.pocket-kai\.ru\/auth\/check_login$/,
            handler: 'NetworkFirst', // Используем NetworkFirst для этого эндпоинта
            options: {
              cacheName: 'pocket-kai-api-cache--check_login', // Название кэша для этого эндпоинта
              expiration: {
                maxEntries: 10, // Кэшируем максимум 10 записей
                maxAgeSeconds: 24 * 60 * 60, // Данные кэшируются на 1 день
              },
            },
          },
          {
            urlPattern:
              /^https:\/\/api\.pocket-kai\.ru\/user\/me\/favorite_groups$/,
            handler: 'NetworkFirst', // Используем NetworkFirst для этого эндпоинта
            options: {
              cacheName: 'pocket-kai-api-cache--favourite_groups', // Название кэша для этого эндпоинта
              expiration: {
                maxEntries: 10, // Кэшируем максимум 10 записей
                maxAgeSeconds: 24 * 60 * 60, // Данные кэшируются на 1 день
              },
            },
          },
          {
            urlPattern: /^https:\/\/api\.pocket-kai\.ru\/user\/me\/student$/,
            handler: 'NetworkFirst', // Используем NetworkFirst для этого эндпоинта
            options: {
              cacheName: 'pocket-kai-api-cache--me', // Название кэша для этого эндпоинта
              expiration: {
                maxEntries: 10, // Кэшируем максимум 10 записей
                maxAgeSeconds: 24 * 60 * 60, // Данные кэшируются на 1 день
              },
            },
          },
          {
            urlPattern: /^https:\/\/api\.pocket-kai\.ru\/.*$/,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'pocket-kai-api-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 7 * 24 * 60 * 60,
              },
            },
          },
          // API DEV CACHE
          {
            urlPattern:
              /^https:\/\/api\.pocket-kai\.judle\.ru\/user\/me\/favorite_groups$/,
            handler: 'NetworkFirst', // Используем NetworkFirst для этого эндпоинта
            options: {
              cacheName: 'pocket-kai-api-dev-cache--favourite_groups', // Название кэша для этого эндпоинта
              expiration: {
                maxEntries: 10, // Кэшируем максимум 10 записей
                maxAgeSeconds: 24 * 60 * 60, // Данные кэшируются на 1 день
              },
            },
          },
          {
            urlPattern:
              /^https:\/\/api\.pocket-kai\.judle\.ru\/auth\/check_login$/,
            handler: 'NetworkFirst', // Используем NetworkFirst для этого эндпоинта
            options: {
              cacheName: 'pocket-kai-api-dev-cache--check_login', // Название кэша для этого эндпоинта
              expiration: {
                maxEntries: 10, // Кэшируем максимум 10 записей
                maxAgeSeconds: 24 * 60 * 60, // Данные кэшируются на 1 день
              },
            },
          },
          {
            urlPattern: /^https:\/\/api\.pocket-kai\.ru\/user\/me\/student$/,
            handler: 'NetworkFirst', // Используем NetworkFirst для этого эндпоинта
            options: {
              cacheName: 'pocket-kai-api-dev-cache--me', // Название кэша для этого эндпоинта
              expiration: {
                maxEntries: 10, // Кэшируем максимум 10 записей
                maxAgeSeconds: 24 * 60 * 60, // Данные кэшируются на 1 день
              },
            },
          },
          {
            urlPattern: /^https:\/\/api\.pocket-kai\.judle\.ru\/.*$/,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'pocket-kai-api-dev-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 7 * 24 * 60 * 60,
              },
              plugins: [
                {
                  cacheDidUpdate: async () => {
                    const currentDate = new Date();
                    const year = currentDate.getFullYear();
                    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Добавляем 1, так как месяцы отсчитываются с 0
                    const day = String(currentDate.getDate()).padStart(2, '0'); // Добавляем ведущий ноль, если день меньше 10
                    
                    const currentTime = `${year}-${month}-${day}`;
                    

                    // Отправляем сообщение основному скрипту
                    const clients = await self.clients.matchAll();
                    clients.forEach((client) => {
                      client.postMessage({
                        type: 'UPDATE_TIME',
                        time: currentTime,
                      });
                    });
                  },
                },
              ],
            },
          },
        ],
        globPatterns: ['**/*.{js,css,html,svg,png,ico, ttf}'],
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
