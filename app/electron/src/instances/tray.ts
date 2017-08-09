import * as is from "electron-is"
import { Menu, Tray } from "electron"

const { controls, settings, instances } = global.electron

const menu = () => {
  const { launch } = settings.app.get()
  const click = (key: "launch") => settings.app.set(key, !settings.app.get(key))

  return Menu.buildFromTemplate([
    { label: "Auto start", type: "checkbox", checked: launch, click: click.bind(this, "launch"), visible: !is.dev() },
    { label: "Show", click: controls.show },
    { label: "Exit", click: controls.exit }
  ])
}

export const create = () => {
  const { icon, title } = settings.app.get()
  const tray = new Tray(icon)

  tray.setToolTip(title)
  tray.setContextMenu(menu())
  tray.on("double-click", () => {
    instances.window && instances.window.isVisible() ? controls.hide() : controls.show()
  })

  return tray
}
