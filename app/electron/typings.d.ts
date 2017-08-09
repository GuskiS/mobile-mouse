declare module "electron-is" {
  export const dev: () => boolean
  export const macOS: () => boolean
}

interface AutoLaunchOptions {
  name: string
  path?: string
  isHidden?: boolean
  mac?: {
    useLaunchAgent?: boolean
  }
}

declare class AutoLaunch {
  constructor(options: AutoLaunchOptions)
  enable(): Promise<void>
  disable(): Promise<void>
  isEnabled(): Promise<boolean>
}

declare module "electron-settings" {
  export const set: (key: string, data: any) => void
  export const get: (key: string) => any
  export const getAll: () => any
  export const watch: (key: string, watcher: Function) => void
}
