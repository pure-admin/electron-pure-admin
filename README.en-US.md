<h1>electron-pure-admin</h1>

**Chinese** | [English](./README.en-US.md)

- [electron-pure-admin](https://github.com/xiaoxian521/electron-pure-admin) is in [pure-admin-thin](https://github.com/xiaoxian521/pure-admin-thin) developed on the basis of
- Of course, the platform also provides the `tauri` version of [tauri-pure-admin](https://github.com/xiaoxian521/tauri-pure-admin)

![electron1](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bd770a71ea1e4e21b4eeef035f231889~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)
![electron2](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a4eda386db264053964889c4d5fdf320~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)
![electron3](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/429a5946093549f1ab9fc68ab035ed06~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

### Install dependencies

```sh
yarn install
```

### Start up

```sh
# Desktop
yarn dev
```

```sh
# Browser
yarn browser:dev
```

### Build

```sh
# Desktop
yarn build
```

```sh
# Browser
yarn browser:build
```

`yarn` is more friendly to `electron` support

### FAQ

1. `yarn` is stuck when installing `electron`, just execute the following command to solve it

```sh
yarn config set electron_mirror https://npmmirror.com/mirrors/electron/
```

2. After packaging and installing, the page is always loading

`VITE_PUBLIC_PATH` packaging path environment variable needs to be configured as `./`
