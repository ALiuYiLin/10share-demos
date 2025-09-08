import { createApp } from "./main";
import { renderToString } from 'vue/server-renderer'

export async function render(url:string, manifest:any){
  const {app } = createApp()

  const ctx = {}

  const html = await renderToString(app, ctx)

  const preloadLinks:string[] = []

  return [html,preloadLinks]
}