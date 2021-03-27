import {NgModule} from '@angular/core'
import {RouterModule} from '@angular/router'

import {DocsComponent} from './docs.component'

@NgModule({
  imports: [RouterModule.forChild([{path: '', component: DocsComponent}])],
  declarations: [DocsComponent],
})
export class DocsModule {}
