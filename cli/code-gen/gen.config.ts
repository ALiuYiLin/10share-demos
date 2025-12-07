import type { CodeGenConfig } from "./src/lib/types"

const config = {
  outputBase: "dist",
  partialsDir: "template/partials",
  helpers: ["template/helpers/index.ts"],
  generators: [
    {
      name: "model",
      template: "template/model.hbs",
      data: {
        name: "User",
        fields: [
          { name: "id", type: "string" },
          { name: "age", type: "number" }
        ]
      },
      outFile: "models/{{pascalCase name}}.ts",
      skipIfExists: false
    },
    {
      name: "usersPage",
      template: "template/html/users.hbs",
      data: {
        users: [
          { name: "Alice", age: 28 },
          { name: "Bob", age: 33 },
          { name: "Carol", age: 25 }
        ]
      },
      outFile: "index.html",
      skipIfExists: false
    }
  ]
} satisfies CodeGenConfig

export default config
