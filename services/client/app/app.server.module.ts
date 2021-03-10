import {NgModule} from '@angular/core'
import {NoopAnimationsModule} from '@angular/platform-browser/animations'
import {ServerModule, ServerTransferStateModule} from '@angular/platform-server'

import {AppProdModule} from './app-prod.module'
import {AppComponent} from './app.component'

@NgModule({
  imports: [ServerModule, ServerTransferStateModule, AppProdModule, NoopAnimationsModule],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
