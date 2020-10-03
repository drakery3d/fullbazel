import {NgModule} from '@angular/core'
import {ServiceWorkerModule} from '@angular/service-worker'

import {AppComponent} from './app.component'
import {AppBaseModule} from './app-base.module'

@NgModule({
  imports: [AppBaseModule, ServiceWorkerModule.register('ngsw-worker.js')],
  bootstrap: [AppComponent],
})
export class AppProdModule {
  constructor() {
    console.log(`🚀 Launching production app`)
  }
}
