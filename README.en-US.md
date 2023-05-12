<h1>electron-pure-admin</h1>

**Chinese** | [English](./README.en-US.md)

- [electron-pure-admin](https://github.com/xiaoxian521/electron-pure-admin) is in [pure-admin-thin](https://github.com/xiaoxian521/pure-admin-thin) developed on the basis of
- Of course, the platform also provides the `tauri` version of [tauri-pure-admin](https://github.com/xiaoxian521/tauri-pure-admin)

### Install dependencies

- `yarn install`

### Start up

- `yarn dev`

### Build

- `yarn build`

`yarn` is more friendly to `electron` support

### How to build `pure-admin` full version or other version into `electron` version, just refer to the following two steps

1. [Replace pnpm with yarn, yarn is more friendly to electron support](https://github.com/xiaoxian521/electron-pure-admin/commit/1a036a270cc5792ff6f12070dbf3ac92b8138268)

2. [Add electron support](https://github.com/xiaoxian521/electron-pure-admin/commit/12fbf65ff95757ce444769ac6c3e65265595973d)

### FAQ

1. `yarn` is stuck when installing `electron`, just execute the following command to solve it

```sh
yarn config set electron_mirror https://npmmirror.com/mirrors/electron/
```

2. After packaging and installing, the page is always loading

`VITE_PUBLIC_PATH` packaging path environment variable needs to be configured as `./`
