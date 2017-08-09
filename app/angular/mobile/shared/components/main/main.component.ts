import { Component, ViewChild, ElementRef, Renderer2, OnInit } from "@angular/core"
import { WebsocketService } from "./../../../shared/services"

@Component({
  selector: "[main-component]",
  styleUrls: ["./main.component.sass"],
  templateUrl: "./main.component.html"
})
export class MainComponent implements OnInit {
  size: number
  holding = false
  mouseData: any
  @ViewChild("container") container: ElementRef

  constructor(private websocket: WebsocketService, private renderer: Renderer2) {}

  ngOnInit(): void {
    const inobounce = require("inobounce")
    const nipplejs = require("nipplejs")

    inobounce.enable()
    const zone = this.container.nativeElement
    const joystick = nipplejs.create({
      zone,
      color: "",
      mode: "static",
      restOpacity: 1.0,
      size: (this.size = zone.clientWidth / 2.5),
      position: { top: "50%", left: "50%" }
    })
    this.size /= 4

    joystick.on("start", () => (this.holding = true))
    joystick.on("end", () => (this.holding = false))
    joystick.on("move", (event: EventData, data: any) => (this.mouseData = data))

    this.renderer.listen(joystick[0].ui.back, "tap", () => this.websocket.send("click", true))

    setInterval(() => {
      if (this.holding && this.mouseData && this.mouseData.distance >= this.size) {
        const { force: distance, angle: { radian: angle } } = this.mouseData
        this.websocket.send("move", { distance, angle })
      }
    }, 20)
  }
}
