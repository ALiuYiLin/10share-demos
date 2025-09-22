import { defineConfig } from "vite";
import vuePlugin from '@vitejs/plugin-vue'

export default defineConfig(()=>({
  resolve:{
    alias:{
      "@":"src"
    },
    extensions:['.js', '.ts', '.tsx', '.json']
  },
  plugins:[
    vuePlugin()
  ]
}))