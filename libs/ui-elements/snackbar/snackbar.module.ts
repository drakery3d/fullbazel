import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'

import {SnackbarComponent} from './snackbar.componen'
import {SnackbarService} from './snackbar.service'

@NgModule({
  imports: [CommonModule, BrowserModule, BrowserAnimationsModule],
  declarations: [SnackbarComponent],
  providers: [SnackbarService],
  exports: [SnackbarComponent],
})
export class SnackbarModule {}
