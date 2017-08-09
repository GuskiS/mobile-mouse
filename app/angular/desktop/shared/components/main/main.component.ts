import { Component, Input } from "@angular/core"
import { ElectronService } from "./../../services"

@Component({
  selector: "[main-component]",
  styleUrls: ["./main.component.sass"],
  templateUrl: "./main.component.html"
})
export class MainComponent {
  inputs = [
    { key: "port", type: "number", placeholder: "Port" },
    { key: "sensitivity", type: "number", placeholder: "Sensitivity" }
  ]

  constructor(public electron: ElectronService) {}

  submit(data: UserInterface): void {
    this.electron.settings.user = this.electron.user.set(undefined, data)
  }

  click(): void {
    this.electron.settings.user = this.electron.user.default()
  }
}
