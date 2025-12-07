import path from "node:path"
import { pathToFileURL } from "node:url"
import Handlebars from "handlebars"
import { pascalCase, camelCase, kebabCase } from "change-case"

export async function registerDefaultHelpers() {
  Handlebars.registerHelper("pascalCase", (v: unknown) => pascalCase(String(v)))
  Handlebars.registerHelper("camelCase", (v: unknown) => camelCase(String(v)))
  Handlebars.registerHelper("kebabCase", (v: unknown) => kebabCase(String(v)))
  Handlebars.registerHelper("json", (v: unknown) => JSON.stringify(v))
}

export async function registerHelpersFrom(paths: string[], cwd: string) {
  for (const p of paths) {
    const abs = path.resolve(cwd, p)
    const mod = await import(pathToFileURL(abs).href)
    const helpers = mod.default ?? mod.helpers ?? mod
    if (helpers && typeof helpers === "object") {
      for (const [name, fn] of Object.entries(helpers)) {
        Handlebars.registerHelper(name, fn as any)
      }
    }
  }
}
