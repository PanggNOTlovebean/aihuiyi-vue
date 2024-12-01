import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { alias } from './scripts/alias'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      less: {
        // 这里可以添加 Less 的全局变量或者混入
      }
    }
  },
  resolve: {
    alias: alias,  
  },
  server: {
    proxy: {
      '/plm/v1/': {
        target: 'http://szm3b-szlab-dev27.szm3b:8840/', //实际请求地址
        changeOrigin: true
        // rewrite: (path) => path.replace(/^\/wuyou/, '')
      },
      '/startSession': {
        target: 'http://47.95.36.122:8765', //实际请求地址
        changeOrigin: true
        // rewrite: (path) => path.replace(/^\/wuyou/, '')
      },
    },
  },
})
