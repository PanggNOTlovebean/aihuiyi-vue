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
    host: true, // 监听所有网络接口 (0.0.0.0)
    port: 5173, // 你可以选择任何端口
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
      '/userMessage': {
        target: 'http://47.95.36.122:8765', //实际请求地址
        changeOrigin: true
        // rewrite: (path) => path.replace(/^\/wuyou/, '')
      },
    },
  },
})
