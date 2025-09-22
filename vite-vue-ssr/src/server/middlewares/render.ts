import { Express } from "express";
import path from "path";
import fs from 'fs'
import { rollup } from "rollup";
import { fileURLToPath } from "url";
import vuePlugin from "@vitejs/plugin-vue";
import esbuild from "rollup-plugin-esbuild";

import { createFsFromVolume, Volume } from "memfs";


const str = `
<template>
  <div>
    <h1>test</h1>
    <MyTitle></MyTitle>
  </div>
</template>
<script lang="ts" setup>
import MyTitle from '@/client/components/MyTitle.vue';
</script>
`;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "../..");
export const renderMiddleware = (app: Express) => {
  app.use("/render", async (res, req, next) => {
    const vol = Volume.fromJSON({
      "virtual.vue": str,
    });
    const fsVol = createFsFromVolume(vol);
    const myfs = {
      promises: {
        readFile: (filePath: string, options?: any) => {
          if (filePath === "virtual.vue")
            return fsVol.promises.readFile(filePath, options);
          else return fs.promises.readFile(filePath, options);
        },
      },
    };

    const bundle = await rollup({
      input: ["virtual.vue"],
      // input: ["@/client/pages/home.vue"],
      //@ts-ignore
      fs: myfs.promises,

      external: ["vue"],
      plugins: [
        {
          name: "virtual-component-plugin",
          resolveId(source) {
            if (source.startsWith("@/")) {
              return source
                .replace("@/", projectRoot + "\\")
                .replaceAll("\\", "/");
            }
            return source;
          },
        },
        vuePlugin(),
        esbuild({
          // sourceMap: true,
          logLevel: "verbose",
          target: "es2022",
          loaders: {
            ".vue": "ts",
          },
        }),
      ],
    });
    const { output } = await bundle.generate({ format: "es" });
    console.log("output: ", output[0].code);
  });
};
