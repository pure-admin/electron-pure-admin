<h1>electron-pure-admin</h1>

**中文** | [English](./README.en-US.md)

- [electron-pure-admin](https://github.com/xiaoxian521/electron-pure-admin) 是在 [pure-admin-thin](https://github.com/xiaoxian521/pure-admin-thin) 的基础上开发
- 当然平台还提供 `tauri` 版本的 [tauri-pure-admin](https://github.com/xiaoxian521/tauri-pure-admin)

### 安装依赖

- `yarn install`

### 启动

- `yarn dev`

### 打包

- `yarn build`

`yarn` 对 `electron` 支持更友好

### 如何将 `pure-admin` 完整版或其他版本构建成 `electron` 版本，只需要参考下面两个步骤即可

1. [将 pnpm 更换成 yarn，yarn 对 electron 支持更友好](https://github.com/xiaoxian521/electron-pure-admin/commit/1a036a270cc5792ff6f12070dbf3ac92b8138268)

2. [添加 electron 支持](https://github.com/xiaoxian521/electron-pure-admin/commit/12fbf65ff95757ce444769ac6c3e65265595973d)

### 常见问题

1. `yarn` 安装 `electron` 时卡住，只需要执行下面命令即可解决

```sh
yarn config set electron_mirror https://npmmirror.com/mirrors/electron/
```

2. 打包安装后页面一直处在加载状态

`VITE_PUBLIC_PATH` 打包路径环境变量需要配置为 `./`
