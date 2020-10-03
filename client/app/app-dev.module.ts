import {NgModule} from '@angular/core'

import {AppBaseModule} from './app-base.module'
import {AppComponent} from './app.component'

@NgModule({
  imports: [AppBaseModule],
  bootstrap: [AppComponent],
})
export class AppDevModule {
  constructor() {
    console.log(`🛠️ Launching development app`)
  }
}
