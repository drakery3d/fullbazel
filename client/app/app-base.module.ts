import {BrowserModule} from '@angular/platform-browser'
import {NgModule} from '@angular/core'

import {ENVIRONMENT, environment} from '@client/environment'
import {AppComponent} from './app.component'
import {AppRoutingModule} from './app-routing.module'

@NgModule({
  imports: [BrowserModule.withServerTransition({appId: 'abs'}), AppRoutingModule],
  declarations: [AppComponent],
  providers: [{provide: ENVIRONMENT, useValue: environment}],
})
export class AppBaseModule {}
