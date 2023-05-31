<h1>electron-pure-admin</h1>

**中文** | [English](./README.en-US.md)

- [electron-pure-admin](https://github.com/xiaoxian521/electron-pure-admin) 是在 [pure-admin-thin](https://github.com/xiaoxian521/pure-admin-thin) 的基础上开发
- 当然平台还提供 `tauri` 版本的 [tauri-pure-admin](https://github.com/xiaoxian521/tauri-pure-admin)

![electron1](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bd770a71ea1e4e21b4eeef035f231889~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)
![electron2](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a4eda386db264053964889c4d5fdf320~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)
![electron3](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/429a5946093549f1ab9fc68ab035ed06~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

### 安装依赖

```sh
yarn install
```

### 启动

```sh
# 桌面端
yarn dev
```

```sh
# 浏览器端
yarn browser:dev
```

### 打包

```sh
# 桌面端
yarn build
```

```sh
# 浏览器端
yarn browser:build
```

`yarn` 对 `electron` 支持更友好

### 常见问题

1. `yarn` 安装 `electron` 时卡住，只需要执行下面命令即可解决

```sh
yarn config set electron_mirror https://npmmirror.com/mirrors/electron/
```

2. 打包安装后页面一直处在加载状态

`VITE_PUBLIC_PATH` 打包路径环境变量需要配置为 `./`
