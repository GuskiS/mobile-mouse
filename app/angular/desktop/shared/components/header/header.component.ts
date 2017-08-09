import { Component, HostListener } from "@angular/core"
import { ElectronService } from "./../../services"

@Component({
  selector: "[header-component]",
  styleUrls: ["./header.component.sass"],
  templateUrl: "./header.component.html"
})
export class HeaderComponent {
  @HostListener("document:keyup.escape")
  onMinimize() {
    this.click("hide")
  }
  @HostListener("document:keyup.f5")
  onReload() {
    this.click("reload")
  }

  constructor(public electron: ElectronService) {}

  click(type: "hide" | "exit" | "reload"): void {
    switch (type) {
      case "hide":
        return this.electron.controls.hide()
      case "exit":
        return this.electron.controls.exit()
      case "reload":
        return this.electron.controls.reload()
    }
  }
}
