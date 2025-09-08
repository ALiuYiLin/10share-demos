import { createSSRApp } from "vue"
import APP from "./APP.vue"

export const createApp = ()=>{
  const app = createSSRApp(APP)
  return {app}
}