

import { rollup } from "rollup";
import vue from 'rollup-plugin-vue'


// 注册 ts-node 作为 ESM 加载器

export async function build() {
  const modules = {
    "main.vue": "<template><div><h1>main.vue</h1><foo></foo></div></template><script setup>import foo from 'foo.vue'</script>",
    "foo.vue": "<template><div><h1>hello</h1></div></template>",
  };
  const bundle = await rollup({
    input: "main.vue",
    plugins: [
      {
        name: "loader",
        resolveId(source) {
          if (modules.hasOwnProperty(source)) {
            return source;
          }
        },
        load(id) {
          if (modules.hasOwnProperty(id)) {
            return modules[id as keyof typeof modules];
          }
        },
      },
      vue()
    ],
  });
  const {output} = await bundle.generate({format:'es'})
  console.log('output: ', output[0].code);
}

build()