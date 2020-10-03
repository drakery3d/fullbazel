import {BrowserModule} from '@angular/platform-browser'
import {NgModule} from '@angular/core'

import {AppComponent} from './app.component'
import {AppRoutingModule} from './app-routing.module'

@NgModule({
  imports: [BrowserModule.withServerTransition({appId: 'abs'}), AppRoutingModule],
  declarations: [AppComponent],
})
export class AppBaseModule {}
