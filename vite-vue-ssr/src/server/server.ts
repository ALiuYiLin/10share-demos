import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import express from "express";
import serveStatic from "serve-static";
import { renderMiddleware } from "./middlewares";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const projectRoot = path.resolve(__dirname, "..");

const resolve = (p: string) => path.resolve(projectRoot, p);


export async function createServer(
  root: string = process.cwd(),
  isDev: boolean = process.env.NODE_ENV?.trim() === "development",
  hrmPort?: number
) {
  const indexProd = isDev
    ? ""
    : fs.readFileSync(resolve("client/index.html"), "utf-8");

  const manifest = !isDev
    ? JSON.parse(
        fs.readFileSync(resolve("client/.vite/ssr-manifest.json"), "utf-8")
      )
    : "";

  const app = express();

  let vite;

  if (isDev) {
    vite = await (
      await import("vite")
    ).createServer({
      root,
      logLevel: "info",
      server: {
        middlewareMode: true,
        watch: {
          usePolling: true,
          interval: 100,
        },
        hmr: {
          port: hrmPort,
        },
      },
      appType: "custom",
    });

    app.use(vite.middlewares);
    renderMiddleware(app);
  } else {
    app.use((await import("compression")).default());
    app.use("/assets", serveStatic(resolve("client/assets")));
    renderMiddleware(app);
  }

  app.use("*all", async (req, res, next) => {
    try {
      // const url = req.originalUrl.replace('/test/','/')
      const url = req.originalUrl;
      console.log("url: ", url);
      if (url.startsWith("/assets")) {
        next();
      }

      let template, render;
      if (isDev) {
        template = fs.readFileSync(resolve("../index.html"), "utf-8");

        template = await vite!.transformIndexHtml(url, template);

        render = (await vite!.ssrLoadModule(resolve("server/entry-server.ts")))
          .render;
      } else {
        template = indexProd;
        render = (await import("./entry-server")).render;
      }

      const [appHtml, preloadLinks] = await render(url, manifest);

      const html = template
        .replace(`<!--preload-links-->`, preloadLinks)
        .replace(`<!--app-html-->`, appHtml);

      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (e: any) {
      res.status(500).end(e.stack);
    }
  });

  return { app, vite };
}

createServer().then(({ app }) => {
  app.listen(5173, () => {
    console.log(`http://localhost:5173`);
  });
});
