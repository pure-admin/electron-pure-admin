<h1>electron-pure-admin</h1>

**English** | [中文](./README.md)

- [electron-pure-admin](https://github.com/xiaoxian521/electron-pure-admin) is in [pure-admin-thin](https://github.com/xiaoxian521/pure-admin-thin) developed on the basis of
- Of course, the platform also provides the `tauri` version of [tauri-pure-admin](https://github.com/xiaoxian521/tauri-pure-admin)

![electron1](https://xiaoxian521.github.io/hyperlink/img/electron-pure-admin/1.jpg)
![electron2](https://xiaoxian521.github.io/hyperlink/img/electron-pure-admin/2.jpg)
![electron3](https://xiaoxian521.github.io/hyperlink/img/electron-pure-admin/3.jpg)

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
