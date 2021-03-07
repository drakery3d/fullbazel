import {NgModule} from '@angular/core'
import {EffectsModule} from '@ngrx/effects'
import {routerReducer, StoreRouterConnectingModule} from '@ngrx/router-store'
import {StoreModule} from '@ngrx/store'

import {WebsocketStoreModule} from '@libs/websocket-store'

import {AuthEffects, authReducer} from './auth'
import {CustomSerializer} from './router'

@NgModule({
  imports: [
    WebsocketStoreModule,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    StoreModule.forRoot({router: routerReducer as any, auth: authReducer}),
    EffectsModule.forRoot([AuthEffects]),
    StoreRouterConnectingModule.forRoot({serializer: CustomSerializer}),
  ],
  providers: [AuthEffects],
})
export class RootStoreModule {}
