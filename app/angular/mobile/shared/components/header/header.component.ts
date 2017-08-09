import { Component } from "@angular/core"
import { WebsocketService } from "./../../../shared/services"

@Component({
  selector: "[header-component]",
  styleUrls: ["./header.component.sass"],
  templateUrl: "./header.component.html"
})
export class HeaderComponent {
  constructor(public websocket: WebsocketService) {}
}
