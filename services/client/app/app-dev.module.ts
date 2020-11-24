import {Inject, NgModule} from '@angular/core'
import {ServiceWorkerModule} from '@angular/service-worker'
import {StoreDevtoolsModule} from '@ngrx/store-devtools'

import {ENVIRONMENT, ClientEnvironment} from '@client/environment'
import {RootStoreModule} from '@client/store'
import {AppBaseModule} from './app-base.module'
import {AppComponent} from './app.component'

@NgModule({
  imports: [
    AppBaseModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: false}),
    StoreDevtoolsModule.instrument(),
    RootStoreModule,
  ],
  bootstrap: [AppComponent],
})
export class AppDevModule {
  constructor(@Inject(ENVIRONMENT) private environment: ClientEnvironment) {
    console.log(`🛠️ Launching development app`, this.environment)
  }
}
