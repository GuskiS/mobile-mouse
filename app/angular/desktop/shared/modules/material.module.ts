import { NgModule } from "@angular/core"
import { FormsModule } from "@angular/forms"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"

import { MdButtonModule, MdIconModule, MdToolbarModule, MdSidenavModule, MdInputModule } from "@angular/material"

const modules = [
  FormsModule,
  BrowserAnimationsModule,
  MdButtonModule,
  MdIconModule,
  MdToolbarModule,
  MdSidenavModule,
  MdInputModule
]

@NgModule({
  imports: modules,
  exports: modules
})
export class MaterialModule {}
