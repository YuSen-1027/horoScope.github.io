import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  // 静态资源基础路径 base: './' || '',
  base: process.env.NODE_ENV === 'production' ? './' : '/',
  resolve: {
    alias: {
      // 配置目录别名
      '@': resolve(__dirname, 'src'),
      'views': resolve(__dirname, 'src/views'),
      'utils': resolve(__dirname, 'src/utils'),
    },
  },
  css: {
    // css预处理器
    preprocessorOptions: {
      less: {
        modifyVars: {
          // 全局less变量存储路径(配置less的全局变量)
          hack: `true; @import (reference) "${resolve('src/public/config.less')}";`,
        },
        javascriptEnabled: true,
      }
    }
  },
  // 开发服务器配置
  server: {
    host: true,
    open: true,
    port: 3000,
    proxy: {
      '/api': {
        target: '//www.xxxx.com',
        changeOrigin: true,
        ws: true,
        secure: true,
        rewrite: (path: string) => path.replace(/^\/api/, ''),
      }
    }
  },
})
