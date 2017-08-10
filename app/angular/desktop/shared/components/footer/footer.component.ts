import { Component } from "@angular/core"
import { ElectronService } from "./../../services"

@Component({
  selector: "[footer-component]",
  styleUrls: ["./footer.component.sass"],
  templateUrl: "./footer.component.html"
})
export class FooterComponent {
  url: string
  constructor(public electron: ElectronService) {
    this.url = `http://${this.electron.settings.app.ip}`
  }

  link() {
    this.electron.shell.openExternal(`${this.url}:${this.electron.settings.user.port}`)
  }
}
