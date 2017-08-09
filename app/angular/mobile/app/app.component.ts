import { Component, ViewEncapsulation, Inject, PLATFORM_ID } from "@angular/core"
import { isPlatformBrowser } from "@angular/common"
import { WebsocketService } from "./../shared/services"

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.sass"],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  isBrowser: boolean

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private websocket: WebsocketService) {
    this.isBrowser = isPlatformBrowser(this.platformId)

    if (this.isBrowser) {
      this.websocket.join(`ws://${window.location.host}`)
    }
  }
}
