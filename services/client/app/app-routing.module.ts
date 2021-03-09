import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('../features/home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'discussions',
    loadChildren: () =>
      import('../features/discussions/discussions.module').then(m => m.DiscussionsModule),
  },
  {
    path: 'docs',
    loadChildren: () => import('../features/docs/docs.module').then(m => m.DocsModule),
  },
  {path: '**', redirectTo: 'home', pathMatch: 'full'},
]

@NgModule({
  imports: [RouterModule.forRoot(routes, {initialNavigation: 'enabled'})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
