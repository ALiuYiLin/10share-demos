import path from "node:path"
import { pathToFileURL } from "node:url"
import fs from "fs-extra"
import type { CodeGenConfig } from "./types"

export async function loadConfig(cwd: string): Promise<CodeGenConfig> {
  const p = path.resolve(cwd, "gen.config.ts")
  if (!(await fs.pathExists(p))) throw new Error("gen.config.ts not found")
  const mod = await import(pathToFileURL(p).href)
  const cfg: CodeGenConfig = mod.default ?? mod
  if (!cfg || !Array.isArray(cfg.generators)) throw new Error("invalid config")
  return cfg
}
