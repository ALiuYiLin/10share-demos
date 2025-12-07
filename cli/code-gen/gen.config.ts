export default {
  outputBase: "src/generated",
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
      outFile: "src/models/{{pascalCase name}}.ts",
      skipIfExists: false
    }
  ]
}
