import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'

// import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {SnackbarComponent} from './snackbar.componen'
import {SnackbarService} from './snackbar.service'

// TODO consider two snackbar modules, one for browser one for server?!

@NgModule({
  // imports: [CommonModule, BrowserModule, BrowserAnimationsModule],
  imports: [CommonModule, BrowserModule],
  declarations: [SnackbarComponent],
  providers: [SnackbarService],
  exports: [SnackbarComponent],
})
export class SnackbarModule {}
