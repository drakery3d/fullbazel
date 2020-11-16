import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {RouterModule} from '@angular/router'

import {RealtimeComponent} from './realtime.component'

@NgModule({
  imports: [CommonModule, RouterModule.forChild([{path: '', component: RealtimeComponent}])],
  declarations: [RealtimeComponent],
})
export class RealtimeModule {}
