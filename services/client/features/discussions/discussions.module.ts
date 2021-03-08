import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {RouterModule} from '@angular/router'
import {EffectsModule} from '@ngrx/effects'
import {StoreModule} from '@ngrx/store'

import {UiElementsModule} from '@libs/ui-elements'

import {DiscussionsComponent} from './discussions.component'
import {DiscussionsEffects} from './discussions.effects'
import {discussionsReducer} from './discussions.reducer'

@NgModule({
  imports: [
    CommonModule,
    UiElementsModule,
    RouterModule.forChild([{path: '', component: DiscussionsComponent}]),
    StoreModule.forFeature('discussions', {discussions: discussionsReducer}),
    EffectsModule.forFeature([DiscussionsEffects]),
  ],
  declarations: [DiscussionsComponent],
  providers: [DiscussionsEffects],
})
export class DiscussionsModule {}
