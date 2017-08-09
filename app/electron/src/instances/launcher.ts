import { app } from "electron"
import * as is from "electron-is"

const { settings, instances } = global.electron

export const init = () => {
  if (is.dev()) return
  const AutoLaunch = require("auto-launch")

  const launcher: AutoLaunch = new AutoLaunch({ name: app.getName(), isHidden: true })
  toggle(settings.app.get("launch"), launcher)

  return launcher
}

export const toggle = (enable: boolean, launcher = instances.launcher) => {
  if (is.dev() || !launcher) return

  if (enable) {
    launcher.enable()
  } else {
    launcher.disable()
  }
}
