import {NgModule} from '@angular/core'
import {RouterModule} from '@angular/router'

import {ArchitectureComponent} from './architecture.component'

@NgModule({
  imports: [RouterModule.forChild([{path: '', component: ArchitectureComponent}])],
  declarations: [ArchitectureComponent],
})
export class ArchitectureModule {}
