import {isPlatformBrowser} from '@angular/common'
import {Inject, NgModule, PLATFORM_ID} from '@angular/core'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {ServiceWorkerModule} from '@angular/service-worker'

import {ClientEnvironment, ENVIRONMENT, prod} from '@client/environment'
import {RootStoreModule} from '@client/store'

import {AppBaseModule} from './app-base.module'
import {AppComponent} from './app.component'

/**
 * Purpose of this module:
 * https://stackoverflow.com/a/44402938/8586803
 */
@NgModule({
  imports: [
    AppBaseModule,
    ServiceWorkerModule.register('ngsw-worker.js'),
    RootStoreModule,
    BrowserAnimationsModule,
  ],
  bootstrap: [AppComponent],
  providers: [{provide: ENVIRONMENT, useValue: prod}],
})
export class AppProdBrowserModule {
  constructor(
    @Inject(ENVIRONMENT) private environment: ClientEnvironment,
    @Inject(PLATFORM_ID) private platform: string,
  ) {
    if (isPlatformBrowser(this.platform)) {
      console.log(`🚀 Launching production browser app`, this.environment)
    }
  }
}
