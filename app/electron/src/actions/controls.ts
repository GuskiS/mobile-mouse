const { instances } = global.electron

export const exit = () => instances.window && instances.window.close()
export const show = () => instances.window && instances.window.show()
export const hide = () => instances.window && instances.window.hide()
export const focus = () => instances.window && instances.window.focus()
export const reload = () => instances.window && instances.window.reload()
