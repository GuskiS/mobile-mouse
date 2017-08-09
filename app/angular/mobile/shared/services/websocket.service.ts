import { Injectable } from "@angular/core"

@Injectable()
export class WebsocketService {
  connected = false
  private url: string
  private instance: WebSocket
  private timeout: null | number
  private reconnect = 5000

  join(url: string): void {
    this.url = url
    this.instance = new WebSocket(url)

    this.instance.onopen = this.onOpen.bind(this)
    this.instance.onmessage = this.onMessage.bind(this)
    this.instance.onclose = this.onClose.bind(this)
    this.instance.onerror = this.onReconnect.bind(this)
  }

  send(type: string, payload: Object): void {
    if (this.connected) {
      this.instance.send(JSON.stringify({ type, payload }))
    }
  }

  private onOpen(): void {
    this.connected = true
  }

  private onMessage(): void {
    console.error("message")
  }

  private onClose(event: CloseEvent): void {
    this.connected = false

    switch (event.code) {
      case 1000:
        return
      default:
        return this.onReconnect(event)
    }
  }

  private onReconnect(event: Event): void {
    if (!this.timeout) {
      console.warn(`WebSocketClient: retry in ${this.reconnect}ms`, event)

      this.timeout = window.setTimeout(() => {
        console.warn("WebSocketClient: reconnecting...")
        this.timeout = null
        this.join(this.url)
      }, this.reconnect)
    }
  }
}
