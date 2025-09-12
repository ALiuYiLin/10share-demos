import { defineConfig } from "vite";
import vuePlugin from '@vitejs/plugin-vue'

export default defineConfig(()=>({
  resolve:{
    alias:{
      "@/*":"./src"
    }
  },
  build:{
    ssrManifest: '.vite/ssr-manifest.json',
    outDir: "./dist/vite-vue-ssr/client",
  },
  plugins:[
    vuePlugin()
  ]
}))