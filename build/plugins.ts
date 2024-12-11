import { cdn } from "./cdn";
import vue from "@vitejs/plugin-vue";
import { viteBuildInfo } from "./info";
import svgLoader from "vite-svg-loader";
import type { PluginOption } from "vite";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { configCompressPlugin } from "./compress";
import electron from "vite-plugin-electron/simple";
import removeNoMatch from "vite-plugin-router-warn";
import { visualizer } from "rollup-plugin-visualizer";
import removeConsole from "vite-plugin-remove-console";
import { codeInspectorPlugin } from "code-inspector-plugin";
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
    /**
     * 在页面上按住组合键时，鼠标在页面移动即会在 DOM 上出现遮罩层并显示相关信息，点击一下将自动打开 IDE 并将光标定位到元素对应的代码位置
     * Mac 默认组合键 Option + Shift
     * Windows 默认组合键 Alt + Shift
     * 更多用法看 https://inspector.fe-dev.cn/guide/start.html
     */
    codeInspectorPlugin({
      bundler: "vite",
      hideConsole: true
    }),
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
          electron({
            main: {
              // Shortcut of `build.lib.entry`
              entry: "electron/main/index.ts",
              onstart({ startup }) {
                if (process.env.VSCODE_DEBUG) {
                  console.log(
                    /* For `.vscode/.debug.script.mjs` */ "[startup] Electron App"
                  );
                } else {
                  startup();
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
            preload: {
              input: "electron/preload/index.ts",
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
            },
            // Ployfill the Electron and Node.js API for Renderer process.
            // If you want use Node.js in Renderer process, the `nodeIntegration` needs to be enabled in the Main process.
            // See 👉 https://github.com/electron-vite/vite-plugin-electron-renderer
            renderer: {}
          })
        ]
      : null
  ];
}
