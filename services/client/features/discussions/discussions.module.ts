import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {RouterModule} from '@angular/router'

import {DiscussionsComponent} from './discussions.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: DiscussionsComponent}]),
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [DiscussionsComponent],
})
export class DiscussionsModule {}
