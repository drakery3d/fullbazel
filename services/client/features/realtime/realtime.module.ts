import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {RouterModule} from '@angular/router'
import {EffectsModule} from '@ngrx/effects'
import {StoreModule} from '@ngrx/store'

import {UiElementsModule} from '@libs/ui-elements'

import {QuoteEffects} from './quote.effects'
import {quoteReducer} from './quote.reducer'
import {RealtimeComponent} from './realtime.component'

// TODO remove this module

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
