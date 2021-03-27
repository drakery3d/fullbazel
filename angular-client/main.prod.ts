import {enableProdMode} from '@angular/core'
import {platformBrowser} from '@angular/platform-browser'

import {AppProdBrowserModule} from './app/app-prod-browser.module'

enableProdMode()

/**
 * wait for dom content to be loaded before booting to
 * make state transition from server to browser work
 * https://stackoverflow.com/a/47620452/8586803
 */
document.addEventListener('DOMContentLoaded', () => {
  platformBrowser().bootstrapModule(AppProdBrowserModule)
})
