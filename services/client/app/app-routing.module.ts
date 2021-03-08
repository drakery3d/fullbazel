import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'

// import {DiscussionsModule} from '../features/discussions/discussions.module'

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('../features/home/home.module').then(m => m.HomeModule),
  },
  // TODO don't load lazily
  {
    path: 'discussions',
    loadChildren: () =>
      import('../features/discussions/discussions.module').then(m => m.DiscussionsModule),
    // loadChildren: () => DiscussionsModule,
  },
  {
    path: 'realtime',
    loadChildren: () => import('../features/realtime/realtime.module').then(m => m.RealtimeModule),
  },
  {path: '**', redirectTo: '', pathMatch: 'full'},
]

@NgModule({
  imports: [RouterModule.forRoot(routes, {initialNavigation: 'enabled'})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
