import { defineConfig } from 'vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import Unocss from 'unocss/vite'
import { ElectronDevPlugin } from './plugins/vite-plugin-electron-dev'

export default defineConfig({
  plugins: [
    Vue(),
    vueJsx(),
    Pages({
      dirs: 'render/pages',
      extensions: ['vue', 'tsx']
    }),
    Unocss(),
    ElectronDevPlugin(),
  ],
  resolve: {
    alias: {
      '@': '/render',
      '~': '/main'
    }
  }
})