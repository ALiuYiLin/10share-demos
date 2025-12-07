import path from "node:path"
import fs from "fs-extra"
import { pathToFileURL } from "node:url"
import Handlebars from "handlebars"
import YAML from "yaml"
import type { CodeGenConfig, GeneratorConfig, RunOptions } from "./types"

async function readData(d: unknown, cwd: string): Promise<any> {
  if (typeof d === "string") {
    const abs = path.resolve(cwd, d)
    const ext = path.extname(abs).toLowerCase()
    if (ext === ".json") return fs.readJson(abs)
    if (ext === ".yaml" || ext === ".yml") return YAML.parse(await fs.readFile(abs, "utf8"))
    const mod = await import(pathToFileURL(abs).href)
    return mod.default ?? mod
  }
  if (typeof d === "function") return (d as any)()
  return d
}

function inBase(p: string, base?: string): boolean {
  if (!base) return true
  const b = path.normalize(path.resolve(base))
  const fp = path.normalize(path.resolve(p))
  return fp.startsWith(b)
}

export type GenerateResult = {
  generated: number
  skipped: number
  overwritten: number
  appended: number
  items: Array<{ name: string; outFile: string; reason?: string }>
}

export async function runGenerators(cfg: CodeGenConfig, opts: RunOptions, cwd: string): Promise<GenerateResult> {
  const res: GenerateResult = { generated: 0, skipped: 0, overwritten: 0, appended: 0, items: [] }
  const only = opts.only && opts.only.length ? new Set(opts.only) : null
  const base = cfg.outputBase ?? "dist"
  const globalCtx = await readData(cfg.globalData, cwd)
  async function process(g: GeneratorConfig, inheritedCtx: any) {
    const pageCtx = await readData(g.data, cwd)
    const ctx = { ...(globalCtx || {}), ...(inheritedCtx || {}), ...(pageCtx || {}) }
    let ok = true
    if (typeof g.condition === "boolean") ok = g.condition
    if (typeof g.condition === "function") ok = !!(g.condition as any)(ctx)
    if (!ok) { res.skipped++; res.items.push({ name: g.name, outFile: "", reason: "condition" }); return }
    const doGenerate = !!g.template && !!g.outFile
    if (doGenerate) {
      const tplStr = await fs.readFile(path.resolve(cwd, g.template), "utf8")
      const tpl = Handlebars.compile(tplStr)
      const outTpl = Handlebars.compile(g.outFile)
      const relOut = outTpl(ctx)
      const outPath = path.isAbsolute(relOut) ? relOut : path.join(base, relOut)
      if (!inBase(outPath, base)) { res.skipped++; res.items.push({ name: g.name, outFile: outPath, reason: "out-of-base" }); }
      else {
        const rendered = tpl(ctx)
        const finalContent = g.postProcess ? g.postProcess(rendered, ctx) : rendered
        const exists = await fs.pathExists(outPath)
        if (opts.dryRun) { res.items.push({ name: g.name, outFile: outPath }) }
        else if (exists) {
          if (g.skipIfExists && !opts.force) { res.skipped++; res.items.push({ name: g.name, outFile: outPath, reason: "exists" }) }
          else if ((g.append === "before" || g.append === "after") && !opts.force) {
            const cur = await fs.readFile(outPath, "utf8")
            const content = g.append === "before" ? finalContent + cur : cur + finalContent
            await fs.outputFile(outPath, content, "utf8")
            res.appended++; res.items.push({ name: g.name, outFile: outPath })
          } else {
            await fs.outputFile(outPath, finalContent, "utf8")
            res.overwritten++; res.items.push({ name: g.name, outFile: outPath })
          }
        } else {
          await fs.outputFile(outPath, finalContent, "utf8")
          res.generated++; res.items.push({ name: g.name, outFile: outPath })
        }
      }
    }
    if (Array.isArray(g.children) && g.children.length) {
      for (const c of g.children) {
        if (only && !only.has(c.name)) { await process(c, ctx) } else { await process(c, ctx) }
      }
    }
  }
  for (const g of cfg.generators) {
    if (only && !only.has(g.name)) { await process(g, {}) } else { await process(g, {}) }
  }
  return res
}
