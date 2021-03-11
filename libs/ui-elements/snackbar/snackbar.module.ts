import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'

import {SnackbarComponent} from './snackbar.componen'
import {SnackbarService} from './snackbar.service'

@NgModule({
  imports: [CommonModule, BrowserModule],
  declarations: [SnackbarComponent],
  providers: [SnackbarService],
  exports: [SnackbarComponent],
})
export class SnackbarModule {}
