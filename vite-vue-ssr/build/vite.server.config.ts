import { defineConfig } from "vite";
import vuePlugin from '@vitejs/plugin-vue'
import {glob} from 'glob'; // 用于动态匹配文件
import path from "path";
const pkgRoot = path.resolve(__dirname,'../src/server')
const pattern = pkgRoot.replace(/\\/g,'/')+'/**/*.{vue,ts,js}'
const inputFiles = glob.sync(pattern)
export default defineConfig(()=>({
  build:{
    ssr: true,
    rollupOptions:{
      input: inputFiles,
    },
    outDir: "./dist/vite-vue-ssr/server"
  },
  // base,
  plugins:[
    vuePlugin()
  ]
}))