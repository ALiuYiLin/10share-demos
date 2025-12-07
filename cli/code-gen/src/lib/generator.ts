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
  for (const g of cfg.generators) {
    if (only && !only.has(g.name)) continue
    const ctx = await readData(g.data, cwd)
    let ok = true
    if (typeof g.condition === "boolean") ok = g.condition
    if (typeof g.condition === "function") ok = !!(g.condition as any)(ctx)
    if (!ok) { res.skipped++; res.items.push({ name: g.name, outFile: "", reason: "condition" }); continue }
    const tplStr = await fs.readFile(path.resolve(cwd, g.template), "utf8")
    const tpl = Handlebars.compile(tplStr)
    const outTpl = Handlebars.compile(g.outFile)
    const relOut = outTpl(ctx)
    const outPath = path.isAbsolute(relOut) ? relOut : (cfg.outputBase ? path.join(cfg.outputBase, relOut) : path.join(cwd, relOut))
    if (!inBase(outPath, cfg.outputBase)) { res.skipped++; res.items.push({ name: g.name, outFile: outPath, reason: "out-of-base" }); continue }
    const rendered = tpl(ctx)
    const finalContent = g.postProcess ? g.postProcess(rendered, ctx) : rendered
    const exists = await fs.pathExists(outPath)
    if (opts.dryRun) { res.items.push({ name: g.name, outFile: outPath }); continue }
    if (exists) {
      if (g.skipIfExists && !opts.force) { res.skipped++; res.items.push({ name: g.name, outFile: outPath, reason: "exists" }); continue }
      if ((g.append === "before" || g.append === "after") && !opts.force) {
        const cur = await fs.readFile(outPath, "utf8")
        const content = g.append === "before" ? finalContent + cur : cur + finalContent
        await fs.outputFile(outPath, content, "utf8")
        res.appended++; res.items.push({ name: g.name, outFile: outPath }); continue
      }
      await fs.outputFile(outPath, finalContent, "utf8")
      res.overwritten++; res.items.push({ name: g.name, outFile: outPath }); continue
    }
    await fs.outputFile(outPath, finalContent, "utf8")
    res.generated++; res.items.push({ name: g.name, outFile: outPath })
  }
  return res
}
