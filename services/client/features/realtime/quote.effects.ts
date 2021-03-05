import {isPlatformBrowser} from '@angular/common'
import {Inject, Injectable, PLATFORM_ID} from '@angular/core'
import {createEffect} from '@ngrx/effects'
import {Observable, of} from 'rxjs'
import {switchMap} from 'rxjs/operators'

import {ClientEnvironment, ENVIRONMENT} from '@client/environment'
import {Quote} from '@libs/schema'

import {QuoteActions} from './quote.actions'

@Injectable()
export class QuoteEffects {
  private websocket: WebSocket

  constructor(
    @Inject(ENVIRONMENT) public environment: ClientEnvironment,
    @Inject(PLATFORM_ID) private platform: string,
  ) {
    if (isPlatformBrowser(this.platform)) {
      console.log('create web socket', this.environment.websocket)
      this.websocket = new WebSocket(this.environment.websocket)
      this.websocket.onclose = () => console.log('closed')
      this.websocket.onopen = () => console.log('opened')
      this.websocket.onerror = error => console.log('error', error)
    }
  }

  listenForQuotes$ = createEffect(() =>
    this.quotesStream().pipe(switchMap(quote => of(QuoteActions.add({quote})))),
  )

  private quotesStream() {
    return new Observable<Quote>(observer => {
      if (!isPlatformBrowser(this.platform)) return
      this.websocket.onmessage = event => {
        const quote = JSON.parse(event.data) as Quote
        observer.next(quote)
      }
    })
  }
}
