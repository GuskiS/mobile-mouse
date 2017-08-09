import * as settings from "electron-settings"
import { path } from "./../helpers"

const cache: { [key: string]: any } = {}
const DEFAULT: SettingsInterface = {
  app: {
    title: "Mobile Mouse",
    icon: path("assets/icon.png"),
    launch: false,
    blurred: false,
    previous: {},
    button: "left"
  },
  user: {
    port: 7777,
    sensitivity: 5
  }
}

settings.set("app", { ...DEFAULT.app, ...settings.get("app") })
settings.set("user", { ...DEFAULT.user, ...settings.get("user") })

const fromCache = async (file: string) => {
  if (!cache[file]) {
    cache[file] = await import(file)
  }
  return cache[file]
}

const watch = async (newValues: any, oldValues: any) => {
  if (newValues.port && newValues.port !== oldValues.port) {
    const server = await fromCache("./../instances/server")
    server.listen(newValues.port)
  }

  if (newValues.launch !== oldValues.launch) {
    const launcher = await fromCache("./../instances/launcher")
    launcher.toggle(newValues.launch)
  }
}

const object = (storage: keyof SettingsInterface): SettingsObject => {
  settings.watch(storage, watch)

  return {
    get(key?: KeyType) {
      if (key) {
        return settings.get(this.__path(key))
      } else {
        return settings.getAll()[storage]
      }
    },
    set(key: KeyType | undefined = undefined, value: any) {
      if (key) {
        const data = value || (<any>DEFAULT[storage])[key]
        settings.set(this.__path(key), data)
      } else {
        settings.set(storage, value)
      }

      return this.get()
    },
    default() {
      return this.set(null, DEFAULT[storage])
    },
    watch(cb: Function) {
      return settings.watch(storage, cb)
    },
    __path(key: KeyType) {
      return `${storage}.${key}`
    }
  }
}

export const app = object("app")
export const user = object("user")
