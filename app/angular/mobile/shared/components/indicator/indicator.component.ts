import { Component, Input } from "@angular/core"

@Component({
  selector: "indicator-component",
  styleUrls: ["./indicator.component.sass"],
  template: `
    <md-progress-spinner color="warn" mode="indeterminate" *ngIf="!connected"></md-progress-spinner>
    <div class="indicator" *ngIf="connected"></div>
  `
})
export class IndicatorComponent {
  @Input("connected") connected: boolean
}
