import { NgModule } from "@angular/core"
import { FormsModule } from "@angular/forms"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"

import {
  MdButtonModule,
  MdMenuModule,
  MdIconModule,
  MdToolbarModule,
  MdSidenavModule,
  MdSelectModule,
  MdProgressSpinnerModule,
  MdInputModule
} from "@angular/material"

const modules = [
  FormsModule,
  BrowserAnimationsModule,
  MdButtonModule,
  MdMenuModule,
  MdIconModule,
  MdToolbarModule,
  MdSidenavModule,
  MdSelectModule,
  MdProgressSpinnerModule,
  MdInputModule
]

@NgModule({
  imports: modules,
  exports: modules
})
export class MaterialModule {}
