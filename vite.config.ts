import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'

import tailwind from "tailwindcss"
import autoprefixer from "autoprefixer"
import AutoImport from "unplugin-auto-import/vite"
import Components from "unplugin-vue-components/vite"
import Layouts from "vite-plugin-vue-layouts"
import VueI18nPlugin from "@intlify/unplugin-vue-i18n/vite"
import { VueRouterAutoImports } from 'unplugin-vue-router'
import VueRouter from "unplugin-vue-router/vite"

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    postcss: {
      plugins: [
        tailwind(),
        autoprefixer()
      ],
    },
  },
  plugins: [
    VueRouter({
      dts: 'src/types-router.d.ts',
      routesFolder: {
        src: 'src/views',
        exclude: ['**/components/*.vue']
      }
    }),
    Layouts({
      pagesDirs: "src/views",
      exclude: ["**/components/*.vue"],
      importMode: () => 'async'
    }),
    VueI18nPlugin({
      include: fileURLToPath(new URL('./src/locales/**', import.meta.url))
    }),
    AutoImport({
      imports: [
        'vue',
        VueRouterAutoImports,
        {
          'vue-router/auto': ['useRouter', 'useRoute']
        }
      ],
      dts: 'src/auto-imports.d.ts',
      eslintrc: {
        enabled: true
      },
      vueTemplate: true
    }),
    Components({
      dts: 'src/components.d.ts'
    }),
    Vue()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
