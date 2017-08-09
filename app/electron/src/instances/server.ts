import * as ws from "ws"
import * as http from "http"
import * as express from "express"
const gzip = require("express-static-gzip")

import { path } from "./../helpers"
import { message } from "./../actions/websocket"
const { settings, instances } = global.electron

const app = express()
const connections: { __counter: number; [key: string]: any } = { __counter: 0 }

app.use("/", (req, res, next) => {
  res.header("Cache-Control", "private, no-cache")
  next()
})

app.use(gzip(path("assets/mobile")))

const create = (port: number) => {
  const server = (instances.server = http.createServer(app))
  const wss = new ws.Server({ server })

  server.on("connection", socket => socket.setTimeout(1000))
  wss.on("connection", socket => {
    const id = connections.__counter++
    connections[id] = socket

    socket.on("message", message)
    socket.on("close", () => delete connections[id])
  })

  server.listen(port, () => console.log(`Listening on ${port}`))
}

export const listen = (port = settings.user.get("port")) => {
  if (instances.server) {
    close(() => create(port))
  } else {
    create(port)
  }
}

export const close = (cb?: Function) => {
  for (const id in connections) {
    if (id !== "__counter") {
      connections[id].terminate()
      delete connections[id]
    }
  }

  if (instances.server) {
    instances.server.close(cb)
  }
}
