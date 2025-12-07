## 目标
- 使用 `handlebars` 作为模板引擎
- 命令 `npm run code-gen` 读取 `gen.config.ts` 与 `template/` 下模板，生成目标文件
- 支持预览（dry-run）、安全覆盖、局部/全量生成、模板助手与局部片段

## 项目结构
- `gen.config.ts` 配置文件（项目根）
- `template/` 模板目录
- `template/partials/` Handlebars 局部片段
- `template/helpers/` 自定义 Handlebars 助手
- `src/cli/code-gen.ts` CLI 入口
- `src/lib/` 生成核心逻辑（解析配置、渲染、写文件）

## 配置文件（gen.config.ts）
- 导出一个对象或函数，描述生成任务与数据源
- 字段：
  - `outputBase`: 生成根目录，例如 `src/generated`
  - `partialsDir`: `template/partials`
  - `helpers`: 字符串或数组，指向 `template/helpers/*.ts`
  - `generators`: 数组，每项为一个生成单元
    - `name`: 生成器名称
    - `template`: 模板路径（相对 `template/` 或绝对）
    - `data`: 直接对象或数据文件路径（`json|yaml|ts`）
    - `outFile`: 输出文件路径模板（支持变量与助手）
    - `append`: 追加模式（可选：`none|after|before`）
    - `skipIfExists`: 是否跳过已存在文件
    - `condition`: 可选布尔或函数，控制是否执行
    - `postProcess`: 可选函数，对渲染结果做二次处理
- 示例：
```ts
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
```

## 模板组织（template/）
- 单文件模板：`template/*.hbs`
- 片段复用：`template/partials/*.hbs`
- 可选分组：`template/<group>/*.hbs`
- 示例模板：
```hbs
export interface {{pascalCase name}} {
{{#each fields}}
  {{camelCase name}}: {{type}};
{{/each}}
}
```

## 生成流程（CLI）
- 解析 CLI 参数：`--dry-run`、`--force`、`--only <name>`、`--clean`
- 加载 `gen.config.ts`：支持 `ts` 直接加载（`tsx`/`ts-node`），或编译后 `js`
- 注册局部片段：扫描 `partialsDir` 并注册到 Handlebars
- 注册助手：从 `helpers` 加载并 `Handlebars.registerHelper`
- 解析数据：
  - 若为对象，直接使用
  - 若为路径，支持 `json`、`yaml`、`ts` 导出默认值
- 计算输出路径：渲染 `outFile` 模板字符串
- 渲染与写入：
  - 默认写文件；`--dry-run` 仅打印拟生成的路径与内容摘要
  - 存在文件时：`--force` 覆盖；`skipIfExists` 跳过；或追加模式
- 日志与报告：统计生成/跳过/覆盖数量，输出用时

## 安全机制
- 路径白名单：所有写入限制在 `outputBase` 或显式允许的目录
- 覆盖策略：默认不覆盖，需 `--force` 或配置允许
- `--dry-run`：默认提供预览模式，避免误写
- 校验：模板、数据、输出路径为空时给出明确错误

## 可扩展能力
- 多数据源合并：支持函数返回数据，或 `glob` 批量数据文件
- 模板上下文增强：提供全局 `project`、`date`、`env` 等上下文
- 钩子：`beforeAll`、`beforeEach`、`afterEach`、`afterAll`
- 文件过滤：`--only` 按生成器名称执行子集

## NPM 脚本
- `package.json`：
```json
{
  "scripts": {
    "code-gen": "node ./dist/cli/code-gen.js"
  }
}
```
- 若使用 `tsx`：
```json
{
  "scripts": {
    "code-gen": "tsx src/cli/code-gen.ts"
  }
}
```

## 依赖
- 必需：`handlebars`、`fs-extra`、`fast-glob`、`yaml`
- CLI：`commander` 或 `yargs`
- 加载 TS：`tsx` 或 `ts-node`
- 可选助手：`change-case`

## 验证与测试
- `--dry-run` 生成预览报告，并校验文件数量与路径
- 带样例模板与数据的集成测试，断言内容包含关键片段
- 覆盖策略测试：存在文件时的 `skip/force/append`
- Windows 路径测试：确保 `path.join` 与分隔符处理正确

## 迭代选项
- 支持目录模板批量生成（动态数据驱动多个文件）
- 增加 `partials` 自动命名空间与递归引入
- 将生成报告输出为 `codegen-report.json`

## 请确认
- 是否按上述结构与功能实现，并在当前仓库新增相关文件、脚本与样例？确认后我将开始落地实现与验证。