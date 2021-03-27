import {NgModule} from '@angular/core'
import {EffectsModule} from '@ngrx/effects'
import {StoreModule} from '@ngrx/store'

import {WebSocketEffects} from './websocket.effects'
import {websocketReducer} from './websocket.reducer'

@NgModule({
  imports: [
    StoreModule.forFeature('websocket', {connection: websocketReducer}),
    EffectsModule.forFeature([WebSocketEffects]),
  ],
  providers: [WebSocketEffects],
})
export class WebsocketStoreModule {}
