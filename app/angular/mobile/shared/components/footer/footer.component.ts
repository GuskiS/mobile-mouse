import { Component } from "@angular/core"
import { NgForm } from "@angular/forms"
import { WebsocketService } from "./../../../shared/services"

@Component({
  selector: "[footer-component]",
  styleUrls: ["./footer.component.sass"],
  templateUrl: "./footer.component.html"
})
export class FooterComponent {
  action: any
  input = false
  buttons = ["left", "middle", "right"]
  button = this.buttons[0]

  constructor(private websocket: WebsocketService) {}

  change(): void {
    this.websocket.send("button", { button: this.button })
  }

  send(event: Event, { value, form }: NgForm) {
    if (value) {
      this.timeout(() => {
        this.websocket.send("text", value)
        form.reset()
      })
    }
  }

  text(event: Event): void {
    this.timeout(() => (this.input = !this.input))
  }

  timeout(cb: Function): void {
    if (!this.action) {
      this.action = setTimeout(() => {
        cb()
        this.action = null
      }, 250)
    }
  }

  hold(): void {
    this.websocket.send("hold", true)
  }
}
