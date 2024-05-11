<h1>electron-pure-admin</h1>

**中文** | [English](./README.en-US.md)

- [electron-pure-admin](https://github.com/xiaoxian521/electron-pure-admin) 是在 [pure-admin-thin](https://github.com/xiaoxian521/pure-admin-thin) 的基础上开发
- 当然平台还提供 `tauri` 版本的 [tauri-pure-admin](https://github.com/xiaoxian521/tauri-pure-admin)

![electron1](https://xiaoxian521.github.io/hyperlink/img/electron-pure-admin/1.jpg)
![electron2](https://xiaoxian521.github.io/hyperlink/img/electron-pure-admin/2.jpg)
![electron3](https://xiaoxian521.github.io/hyperlink/img/electron-pure-admin/3.jpg)

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
