import "./../../electron/electron.d"

declare global {
  interface Window {
    __electron: NodeJS.GlobalElectron
  }
}
