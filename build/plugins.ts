import { cdn } from "./cdn";
import vue from "@vitejs/plugin-vue";
import { viteBuildInfo } from "./info";
import svgLoader from "vite-svg-loader";
import type { PluginOption } from "vite";
import vueJsx from "@vitejs/plugin-vue-jsx";
import electron from "vite-plugin-electron";
import { configCompressPlugin } from "./compress";
import removeNoMatch from "vite-plugin-router-warn";
import renderer from "vite-plugin-electron-renderer";
import { visualizer } from "rollup-plugin-visualizer";
import removeConsole from "vite-plugin-remove-console";
import { themePreprocessorPlugin } from "@pureadmin/theme";
import { genScssMultipleScopeVars } from "../src/layout/theme";
import { vitePluginFakeServer } from "vite-plugin-fake-server";
import pkg from "../package.json";

export function getPluginsList(
  command: string,
  VITE_CDN: boolean,
  VITE_COMPRESSION: ViteCompression
): PluginOption[] {
  const prodMock = true;
  const isServe = command === "serve";
  const isBuild = command === "build";
  const lifecycle = process.env.npm_lifecycle_event;
  const sourcemap = isServe || !!process.env.VSCODE_DEBUG;
  return [
    vue(),
    // jsx、tsx语法支持
    vueJsx(),
    viteBuildInfo(),
    /**
     * 开发环境下移除非必要的vue-router动态路由警告No match found for location with path
     * 非必要具体看 https://github.com/vuejs/router/issues/521 和 https://github.com/vuejs/router/issues/359
     * vite-plugin-router-warn只在开发环境下启用，只处理vue-router文件并且只在服务启动或重启时运行一次，性能消耗可忽略不计
     */
    removeNoMatch(),
    // mock支持
    vitePluginFakeServer({
      logger: false,
      include: "mock",
      infixName: false,
      enableProd: command !== "serve" && prodMock
    }),
    // 自定义主题
    themePreprocessorPlugin({
      scss: {
        multipleScopeVars: genScssMultipleScopeVars(),
        extract: true
      }
    }),
    // svg组件化支持
    svgLoader(),
    VITE_CDN ? cdn : null,
    configCompressPlugin(VITE_COMPRESSION),
    // 线上环境删除console
    removeConsole({ external: ["src/assets/iconfont/iconfont.js"] }),
    // 打包分析
    lifecycle === "report"
      ? visualizer({ open: true, brotliSize: true, filename: "report.html" })
      : (null as any),
    !lifecycle.includes("browser")
      ? [
          // 支持electron
          electron([
            {
              // Main-Process entry file of the Electron App.
              entry: "electron/main/index.ts",
              onstart(options) {
                if (process.env.VSCODE_DEBUG) {
                  console.log(
                    /* For `.vscode/.debug.script.mjs` */ "[startup] Electron App"
                  );
                } else {
                  options.startup();
                }
              },
              vite: {
                build: {
                  sourcemap,
                  minify: isBuild,
                  outDir: "dist-electron/main",
                  rollupOptions: {
                    external: Object.keys(
                      "dependencies" in pkg ? pkg.dependencies : {}
                    )
                  }
                }
              }
            },
            {
              entry: "electron/preload/index.ts",
              onstart(options) {
                // Notify the Renderer-Process to reload the page when the Preload-Scripts build is complete,
                // instead of restarting the entire Electron App.
                options.reload();
              },
              vite: {
                build: {
                  sourcemap: sourcemap ? "inline" : undefined, // #332
                  minify: isBuild,
                  outDir: "dist-electron/preload",
                  rollupOptions: {
                    external: Object.keys(
                      "dependencies" in pkg ? pkg.dependencies : {}
                    )
                  }
                }
              }
            }
          ]),
          // Use Node.js API in the Renderer-process
          renderer()
        ]
      : null
  ];
}
