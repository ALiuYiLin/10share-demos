import { Command } from "commander"
import path from "node:path"
import { loadConfig } from "../lib/config"
import { registerPartials } from "../lib/partials"
import { registerDefaultHelpers, registerHelpersFrom } from "../lib/helpers"
import { runGenerators } from "../lib/generator"

async function main() {
  const program = new Command()
  program.option("--dry-run", "preview only")
  program.option("--force", "overwrite existing files")
  program.option("--only <names>", "comma separated generator names")
  program.parse(process.argv)
  const opts = program.opts() as { dryRun?: boolean; force?: boolean; only?: string }
  const only = opts.only ? opts.only.split(",").map(s => s.trim()).filter(Boolean) : undefined
  const cwd = process.cwd()
  const cfg = await loadConfig(cwd)
  await registerDefaultHelpers()
  await registerHelpersFrom(cfg.helpers ?? [], cwd)
  await registerPartials(cfg.partialsDir, cwd)
  const res = await runGenerators(cfg, { dryRun: !!opts.dryRun, force: !!opts.force, only }, cwd)
  const total = res.generated + res.overwritten + res.appended
  process.stdout.write(`generated=${res.generated} overwritten=${res.overwritten} appended=${res.appended} skipped=${res.skipped} total=${total}\n`)
  for (const it of res.items) {
    const reason = it.reason ? ` (${it.reason})` : ""
    process.stdout.write(`${it.name} -> ${path.normalize(it.outFile)}${reason}\n`)
  }
}

main().catch(e => { process.stderr.write(String(e.message || e)); process.exit(1) })
