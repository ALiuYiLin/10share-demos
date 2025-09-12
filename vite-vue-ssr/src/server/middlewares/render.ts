// import { Express } from "express"
// import path from "path"
// import {rollup} from 'rollup'
// import { fileURLToPath } from "url"
// import resolve from '@rollup/plugin-node-resolve';
// import commonjs from '@rollup/plugin-commonjs';

// const str = `
// <template>
//   <div>
//     <h1>test</h1>
//     <MyTitle></MyTitle>
//   </div>
// </template>
// <script lang="ts" setup>
// import MyTitle from '@/client/components/MyTitle.vue';
// </script>
// `
// const __dirname = path.dirname(fileURLToPath(import.meta.url))
// const projectRoot = path.resolve(__dirname,'../..')
// export const renderMiddleware = (app:Express)=>{
//   app.use('/render',async (res,req,next)=>{
//     const bundle = await rollup({
//       input:'virtual.vue',
//       plugins:[
//         {
//           name:'virtual-component-plugin',
//           resolveId(source){
//             if(source.startsWith('@/')){
//               return source.replace('@/',projectRoot)
//             }
//           },
//           load(id){
//             if(id === 'virtual.vue'){
//               return str
//             }
//           }
//         },
//         resolve(),
//         commonjs()
//       ]
//     })
//     const {output} = await bundle.generate({format:'es'})
//     console.log('output: ', output);
//   })
// }