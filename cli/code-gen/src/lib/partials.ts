import path from "node:path"
import fg from "fast-glob"
import fs from "fs-extra"
import Handlebars from "handlebars"

export async function registerPartials(dir?: string, cwd?: string) {
  if (!dir) return
  const base = cwd ?? process.cwd()
  const abs = path.resolve(base, dir)
  if (!(await fs.pathExists(abs))) return
  const files = await fg(["**/*.hbs"], { cwd: abs, dot: false })
  for (const f of files) {
    const name = f.replace(/\\/g, "/").replace(/\.hbs$/, "")
    const content = await fs.readFile(path.join(abs, f), "utf8")
    Handlebars.registerPartial(name, content)
  }
}
