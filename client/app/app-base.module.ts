import {BrowserModule} from '@angular/platform-browser'
import {NgModule} from '@angular/core'

import {AppComponent} from './app.component'
import {AppRoutingModule} from './app-routing.module'

@NgModule({
  imports: [BrowserModule, AppRoutingModule],
  declarations: [AppComponent],
  // TODO inject environment variables
})
export class AppBaseModule {}
