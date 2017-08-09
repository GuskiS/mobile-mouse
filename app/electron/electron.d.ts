declare namespace NodeJS {
  export interface GlobalElectron {
    instances: {
      window?: Electron.BrowserWindow
      tray?: Electron.Tray
      launcher?: AutoLaunch
      server?: any
    }
    settings: SettingsObjectImport
    controls: ControlsInterface
    shell: Electron.Shell
  }

  export interface Global {
    electron: GlobalElectron
  }
}

interface AppInterface {
  title: string
  icon: string
  launch: boolean
  blurred: boolean
  previous: { x?: number; y?: number; hidden?: boolean }
  button: "left" | "middle" | "right"
}

interface UserInterface {
  port: number
  sensitivity: number
}

interface SettingsInterface {
  app: AppInterface
  user: UserInterface
}

interface SettingsObjectImport {
  app: SettingsObject
  user: SettingsObject
}

interface SettingsObject {
  get(key?: KeyType): any
  set(key?: KeyType, value: any): any
  default(): any
  watch(cb: Function): any
  __path(key: KeyType): string
}

type KeyType = keyof AppInterface | keyof UserInterface

interface ControlsInterface {
  exit(): void
  show(): void
  hide(): void
  focus(): void
  reload(): void
}
