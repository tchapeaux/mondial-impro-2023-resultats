import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      workbox: {
        globPatterns: ['**/*.{js,vue,css,html,png,json,svg}'],
        cleanupOutdatedCaches: true
      },
      manifest: {
        name: "29e Mondial d'Improvisation",
        short_name: 'Mondial 29',
        description: "Programme et Classement du 29e Mondial d'Improvisation",
        theme_color: '#86c9d1',
        background_color: '#05142b',
        display: 'standalone',
        icons: [
          {
            src: '/mondial-icon.png',
            sizes: '192x192',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
