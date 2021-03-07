import {HttpClientModule} from '@angular/common/http'
import {APP_INITIALIZER, NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import {Store} from '@ngrx/store'

import {ENVIRONMENT} from '@client/environment'

import {initApplication} from './app-initializer'
import {AppRoutingModule} from './app-routing.module'
import {AppComponent} from './app.component'
import {AuthService} from './auth.service'
import {NavigationComopnent} from './navigation.component'
import {PushNotificationService} from './push-notification.service'
import {ServiceWorkerService} from './service-worker.service'

@NgModule({
  imports: [
    HttpClientModule,
    BrowserModule.withServerTransition({appId: 'fullstack-bazel'}),
    AppRoutingModule,
  ],
  declarations: [AppComponent, NavigationComopnent],
  providers: [
    ServiceWorkerService,
    PushNotificationService,
    AuthService,
    {
      provide: APP_INITIALIZER,
      useFactory: initApplication,
      multi: true,
      deps: [AuthService, Store, ENVIRONMENT],
    },
  ],
})
export class AppBaseModule {}
