export type GeneratorConfig = {
  name: string
  template: string
  data: unknown
  outFile: string
  append?: "none" | "after" | "before"
  skipIfExists?: boolean
  condition?: boolean | ((ctx: unknown) => boolean)
  postProcess?: (content: string, ctx: unknown) => string
}

export type CodeGenConfig = {
  outputBase?: string
  partialsDir?: string
  helpers?: string[]
  globalData?: unknown
  generators: GeneratorConfig[]
}

export type RunOptions = {
  dryRun?: boolean
  force?: boolean
  only?: string[]
}
