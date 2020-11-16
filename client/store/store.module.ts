import {NgModule} from '@angular/core'
import {EffectsModule} from '@ngrx/effects'
import {routerReducer, StoreRouterConnectingModule} from '@ngrx/router-store'
import {StoreModule} from '@ngrx/store'

import {CustomSerializer} from './router'

@NgModule({
  imports: [
    StoreModule.forRoot({router: routerReducer}),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot({serializer: CustomSerializer}),
  ],
})
export class RootStoreModule {}
