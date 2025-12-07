import type { CodeGenConfig } from "./src/lib/types"

const config = {
  outputBase: "dist",
  partialsDir: "template/partials",
  helpers: ["template/helpers/index.ts"],
  globalData: {
    title: "共享标题：演示页面123"
  },
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
        ],
        ptitle: "父子页共享数据"
      },
      outFile: "index.html",
      skipIfExists: false,
      children: [
        {
          name: "todoPage",
          template: "template/html/todo.hbs",
          data: {
            todos: [
              { text: "完善 README", done: false },
              { text: "实现数据合并", done: true },
              { text: "增加集成测试", done: false }
            ]
          },
          outFile: "todo.html",
          skipIfExists: false
        },
        {
          name: "newPage",
          template: "template/html/new.hbs",
          data: {},
          outFile: "new.html",
          skipIfExists: false
        }
      ]
    },
  ]
} satisfies CodeGenConfig

export default config
