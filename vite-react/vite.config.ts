import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname,'src')
    }
  },
  server: {
    // 开发环境代理，解决跨域问题
    proxy: {
      '/locales': {
        target: 'http://localhost:5173',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/locales/, '/src/locales')
      }
    }
  }
})
