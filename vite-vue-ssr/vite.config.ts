import { defineConfig } from "vite";
import vuePlugin from '@vitejs/plugin-vue'

const base = '/test/'
export default defineConfig(()=>({
  base,
  plugins:[
    vuePlugin()
  ]
}))