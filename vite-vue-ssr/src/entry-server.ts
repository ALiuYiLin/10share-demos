import { createApp } from "./main";
import { renderToString } from 'vue/server-renderer'

export async function render(url:string, manifest:any){
  const {app,router } = createApp()

  await router.push(url)
  await router.isReady()
  const ctx = {}

  const html = await renderToString(app, ctx)

  const preloadLinks:string[] = []

  return [html,preloadLinks]
}