import {platformBrowser} from '@angular/platform-browser'

import {AppDevModule} from './app/app-dev.module'

const loadingElement = document.querySelector('.app-loading')

platformBrowser()
  .bootstrapModule(AppDevModule)
  .then(() => {
    loadingElement.classList.add('loaded')
    setTimeout(() => loadingElement.remove(), 300)
  })
