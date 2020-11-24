import {NgModule} from '@angular/core'
import {Routes, RouterModule} from '@angular/router'

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('../features/home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'about',
    loadChildren: () => import('../features/about/about.module').then(m => m.AboutModule),
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
