import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {RouterModule} from '@angular/router'

import {UiElementsModule} from '@libs/ui-elements'

import {DiscussionsComponent} from './discussions.component'

@NgModule({
  imports: [
    CommonModule,
    UiElementsModule,
    RouterModule.forChild([{path: '', component: DiscussionsComponent}]),
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [DiscussionsComponent],
})
export class DiscussionsModule {}
