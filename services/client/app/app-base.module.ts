import {HttpClientModule} from '@angular/common/http'
import {NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'

import {AppRoutingModule} from './app-routing.module'
import {AppComponent} from './app.component'
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
  providers: [ServiceWorkerService, PushNotificationService],
})
export class AppBaseModule {}
