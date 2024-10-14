import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
//element按需導入
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    //   Components({
    //     resolvers: [
    //       AutoImport({
    //         resolvers: [ElementPlusResolver()],
    //       }),
    //       ElementPlusResolver({
    //         importStyle: "sass",
    //       }),
    //     ],
    //   }),
    // ],
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver({
        importStyle: "sass",
      })],
    }),
  ],
  server: {
    proxy: {
      // 以 `/api` 開頭的請求會被代理到後端服務
      '/api': {
        target: 'http://iorlvm.i234.me:8080', // 後端服務的地址
        changeOrigin: true, // 使代理請求的 Host 為後端服務的地址
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "@/styles/element/index.scss" as *;
          @use "@/styles/var.scss" as *;
        `,
      },
    },
  },
})
