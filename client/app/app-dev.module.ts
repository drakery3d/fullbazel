import {NgModule} from '@angular/core'
import {ServiceWorkerModule} from '@angular/service-worker'

import {AppBaseModule} from './app-base.module'
import {AppComponent} from './app.component'

@NgModule({
  imports: [AppBaseModule, ServiceWorkerModule.register('ngsw-worker.js', {enabled: false})],
  bootstrap: [AppComponent],
})
export class AppDevModule {
  constructor() {
    console.log(`🛠️ Launching development app`)
  }
}
