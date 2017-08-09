import * as robot from "robotjs"
robot.setKeyboardDelay(1)
const { settings } = global.electron

interface MessageInterface {
  type: string
  payload: MoveInterface | ButtonInterface | TextInterface | ScrollInterface
}

interface MoveInterface {
  angle: number
  distance: number
}
interface ButtonInterface {
  button: string
}
interface TextInterface {
  text: string
}
interface ScrollInterface {
  magnitude: number
}

const move = ({ angle, distance }: MoveInterface) => {
  const pos = robot.getMousePos()
  const sensitivity = settings.user.get("sensitivity")

  const x = pos.x + Math.cos(angle) * distance * sensitivity
  const y = pos.y - Math.sin(angle) * distance * sensitivity
  robot.moveMouse(x, y)
}

const button = ({ button }: ButtonInterface) => settings.app.set("button", button)
const hold = (_: any, direction = "down") => robot.mouseToggle(direction, settings.app.get("button"))
const click = (_: any) => {
  hold("up")
  robot.mouseClick(settings.app.get("button"), false)
}
const text = ({ text }: TextInterface) => text && robot.typeString(text)
// const scroll = ({ magnitude }: ScrollInterface) => robot.scrollMouse(0, magnitude)

const options: { [key: string]: Function } = { move, click, hold, button, text }

export const message = (string: string) => {
  const data: MessageInterface = JSON.parse(string)
  const func = options[data.type]
  func ? func(data.payload) : console.error(`Websocket action ${data.type} not implemented`)
}
