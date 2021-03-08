import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'

import {DiscussionsModule} from '../features/discussions/discussions.module'

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('../features/home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'discussions',
    loadChildren: () => DiscussionsModule,
  },
  {
    path: 'architecture',
    loadChildren: () =>
      import('../features/architecture/architecture.module').then(m => m.ArchitectureModule),
  },
  {
    path: 'realtime',
    loadChildren: () => import('../features/realtime/realtime.module').then(m => m.RealtimeModule),
  },
  {path: '**', redirectTo: 'home', pathMatch: 'full'},
]

@NgModule({
  imports: [RouterModule.forRoot(routes, {initialNavigation: 'enabled'})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
