import { app, shell } from "electron"
import * as is from "electron-is"

global.electron = {
  instances: {},
  settings: {} as SettingsObjectImport,
  controls: {} as ControlsInterface,
  shell
}

import { path } from "./helpers"
import * as Window from "./instances/window"

const exists = app.makeSingleInstance(Window.exists)
if (exists) {
  app.quit()
} else {
  if (is.dev()) {
    require("electron-reload")(__dirname, {
      electron: path("./node_modules/.bin/electron")
    })
  }

  app.on("ready", Window.create)

  app.on("window-all-closed", () => {
    if (!is.macOS()) {
      app.quit()
    }
  })

  app.on("activate", () => {
    if (!global.electron.instances.window) {
      Window.create()
    }
  })
}
