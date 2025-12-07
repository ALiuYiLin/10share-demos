import { pascalCase, camelCase, kebabCase } from "change-case"

export const helpers = {
  pascalCase: (v: string) => pascalCase(String(v)),
  camelCase: (v: string) => camelCase(String(v)),
  kebabCase: (v: string) => kebabCase(String(v)),
  json: (v: unknown) => JSON.stringify(v)
}

export default helpers
