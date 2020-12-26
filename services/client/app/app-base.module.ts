import {BrowserModule} from '@angular/platform-browser'
import {NgModule} from '@angular/core'

import {ENVIRONMENT, environment} from '@client/environment'
import {AppComponent} from './app.component'
import {AppRoutingModule} from './app-routing.module'
import {ServiceWorkerService} from './service-worker.service'
import {NavigationComopnent} from './navigation.component'
import {PushNotificationService} from './push-notification.service'

@NgModule({
  imports: [BrowserModule.withServerTransition({appId: 'fullstack-bazel'}), AppRoutingModule],
  declarations: [AppComponent, NavigationComopnent],
  providers: [
    ServiceWorkerService,
    PushNotificationService,
    {provide: ENVIRONMENT, useValue: environment},
  ],
})
export class AppBaseModule {}
