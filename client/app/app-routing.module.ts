import {NgModule} from '@angular/core'
import {Routes, RouterModule} from '@angular/router'

// TODO showcase lazy loading
const routes: Routes = [{path: '**', redirectTo: '/', pathMatch: 'full'}]

@NgModule({
  imports: [RouterModule.forRoot(routes, {initialNavigation: 'enabled'})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
