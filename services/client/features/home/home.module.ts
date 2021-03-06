import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {RouterModule} from '@angular/router'

import {UiElementsModule} from '@libs/ui-elements'

import {HomeComponent} from './home.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: HomeComponent}]),
    UiElementsModule,
  ],
  declarations: [HomeComponent],
})
export class HomeModule {}
