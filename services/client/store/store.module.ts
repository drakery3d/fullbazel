import {NgModule} from '@angular/core'
import {EffectsModule} from '@ngrx/effects'
import {routerReducer, StoreRouterConnectingModule} from '@ngrx/router-store'
import {StoreModule} from '@ngrx/store'

import {WebsocketStoreModule} from '@libs/websocket-store'

import {AuthEffects, authReducer} from './auth'
import {MessagesEffects, messagesReducer} from './messages'
import {CustomSerializer} from './router'
import {usersReducer} from './users'

@NgModule({
  imports: [
    WebsocketStoreModule,
    StoreModule.forRoot({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      router: routerReducer as any,
      auth: authReducer,
      messages: messagesReducer,
      users: usersReducer,
    }),
    EffectsModule.forRoot([AuthEffects, MessagesEffects]),
    StoreRouterConnectingModule.forRoot({serializer: CustomSerializer}),
  ],
  providers: [AuthEffects, MessagesEffects],
})
export class RootStoreModule {}
