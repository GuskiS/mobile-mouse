import { Component, ViewEncapsulation, OnDestroy } from "@angular/core"
import { ElectronService } from "./../shared/services"

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.sass"],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnDestroy {
  constructor(public electron: ElectronService) {}

  ngOnDestroy(): void {
    this.electron.clean()
  }
}
