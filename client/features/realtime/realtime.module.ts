import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {RouterModule} from '@angular/router'
import {StoreModule} from '@ngrx/store'

import {UiElementsModule} from '@libs/ui-elements'
import {RealtimeComponent} from './realtime.component'
import {quoteReducer} from './quote.reducer'

@NgModule({
  imports: [
    CommonModule,
    UiElementsModule,
    RouterModule.forChild([{path: '', component: RealtimeComponent}]),
    StoreModule.forFeature('realtime', {quotes: quoteReducer}),
  ],
  declarations: [RealtimeComponent],
})
export class RealtimeModule {}
