import { NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"

import { AppComponent } from "./app.component"
import { ALL_COMPONENTS, ALL_MODULES, ALL_SERVICES } from "./../shared/"

@NgModule({
  declarations: [AppComponent, ALL_COMPONENTS],
  imports: [BrowserModule.withServerTransition({ appId: "mobile-mouse" }), ALL_MODULES],
  providers: [ALL_SERVICES],
  bootstrap: [AppComponent]
})
export class AppModule {}
