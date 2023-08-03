import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import pugPlugin from 'vite-plugin-pug'

// https://vitejs.dev/config
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../../src')
    }
  },
  plugins: [vue(), pugPlugin()]
})
