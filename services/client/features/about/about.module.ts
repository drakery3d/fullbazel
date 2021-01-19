import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {RouterModule} from '@angular/router'

import {UiElementsModule} from '@libs/ui-elements'

import {AboutComponent} from './about.component'

@NgModule({
  imports: [
    CommonModule,
    UiElementsModule,
    RouterModule.forChild([{path: '', component: AboutComponent}]),
  ],
  declarations: [AboutComponent],
})
export class AboutModule {}
