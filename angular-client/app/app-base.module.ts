import {HttpClientModule} from '@angular/common/http'
import {APP_INITIALIZER, NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import {Store} from '@ngrx/store'
import {first, skipWhile} from 'rxjs/operators'

import {ClientEnvironment, ENVIRONMENT} from '@client/environment'
import {SharedModule} from '@client/shared'
import {AuthActions, AuthSelectors} from '@client/store'
import {SnackbarModule} from '@libs/ui-elements'
import {WebSocketActions, WebSocketSelectors} from '@libs/websocket-store'

import {AppRoutingModule} from './app-routing.module'
import {AppComponent} from './app.component'
import {ServiceWorkerService} from './service-worker.service'

@NgModule({
  imports: [
    HttpClientModule,
    BrowserModule.withServerTransition({appId: 'fullstack-bazel'}),
    AppRoutingModule,
    SnackbarModule,
    SharedModule,
  ],
  declarations: [AppComponent],
  providers: [
    ServiceWorkerService,
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [Store, ENVIRONMENT],
      useFactory: (store: Store, environment: ClientEnvironment) => {
        return async () => {
          store.dispatch(AuthActions.tryToAuthenticate())
          await store
            .select(AuthSelectors.isInitialized)
            .pipe(
              skipWhile(initialized => !initialized),
              first(),
            )
            .toPromise()
          store.dispatch(WebSocketActions.connect({url: environment.websocket}))
          return store
            .select(WebSocketSelectors.isConnecting)
            .pipe(
              skipWhile(connecting => connecting),
              first(),
            )
            .toPromise()
        }
      },
    },
  ],
})
export class AppBaseModule {}
