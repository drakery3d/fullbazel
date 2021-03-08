import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {RouterModule} from '@angular/router'

import {UiElementsModule} from '@libs/ui-elements'

import {HomeComponent} from './home.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: HomeComponent}]),
    FormsModule,
    ReactiveFormsModule,
    UiElementsModule,
  ],
  declarations: [HomeComponent],
})
export class HomeModule {}
