import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {RouterModule} from '@angular/router'
import {EffectsModule} from '@ngrx/effects'
import {StoreModule} from '@ngrx/store'

import {UiElementsModule} from '@libs/ui-elements'

import {RealtimeComponent} from './realtime.component'
import {quoteReducer} from './quote.reducer'
import {QuoteEffects} from './quote.effects'

@NgModule({
  imports: [
    CommonModule,
    UiElementsModule,
    RouterModule.forChild([{path: '', component: RealtimeComponent}]),
    StoreModule.forFeature('realtime', {quotes: quoteReducer}),
    EffectsModule.forFeature([QuoteEffects]),
  ],
  declarations: [RealtimeComponent],
  providers: [QuoteEffects],
})
export class RealtimeModule {}
