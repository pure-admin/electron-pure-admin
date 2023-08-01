/**
 * @type {() => import('electron-builder').Configuration}
 * @see https://www.electron.build/configuration/configuration
 */
module.exports = async function () {
  return {
    appId: "com.pure.electron",
    productName: "electron-pure-admin",
    copyright: "Copyright © 2020-present, pure-admin",
    publish: {
      provider: "github",
      releaseType: "release"
    },
    directories: {
      buildResources: "dist",
      output: "release/${version}"
    },
    extraMetadata: {
      version: process.env.npm_package_version
    },
    files: ["dist-electron/**", "dist/**"],
    nsis: {
      allowToChangeInstallationDirectory: true,
      createDesktopShortcut: true,
      createStartMenuShortcut: true,
      shortcutName: "pure-admin",
      perMachine: true,
      oneClick: false
    },
    mac: {
      icon: "dist/icons/mac/icon.icns",
      artifactName: "${productName}_${version}.${ext}",
      target: ["dmg"]
    },
    win: {
      icon: "dist/icons/win/icon.ico",
      artifactName: "${productName}_${version}.${ext}",
      target: [
        {
          target: "nsis",
          arch: ["x64"]
        }
      ]
    },
    linux: {
      icon: "dist/icons/png",
      artifactName: "${productName}_${version}.${ext}",
      target: ["deb", "AppImage"]
    }
  };
};
