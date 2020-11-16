import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {RouterModule} from '@angular/router'

import {UiElementsModule} from '@libs/ui-elements'

import {HomeComponent} from './home.component'

@NgModule({
  imports: [
    CommonModule,
    UiElementsModule,
    RouterModule.forChild([{path: '', component: HomeComponent}]),
  ],
  declarations: [HomeComponent],
})
export class HomeModule {}
