import {Inject, NgModule, PLATFORM_ID} from '@angular/core'
import {ServiceWorkerModule} from '@angular/service-worker'
import {isPlatformBrowser} from '@angular/common'

import {ENVIRONMENT, ClientEnvironment} from '@client/environment'
import {AppComponent} from './app.component'
import {AppBaseModule} from './app-base.module'

@NgModule({
  imports: [AppBaseModule, ServiceWorkerModule.register('ngsw-worker.js')],
  bootstrap: [AppComponent],
})
export class AppProdModule {
  constructor(
    @Inject(ENVIRONMENT) private environment: ClientEnvironment,
    @Inject(PLATFORM_ID) private platform: string,
  ) {
    if (isPlatformBrowser(this.platform)) {
      console.log(`🚀 Launching production app`, this.environment)
    }
  }
}
