import {isPlatformBrowser} from '@angular/common'
import {Inject, Injectable, PLATFORM_ID} from '@angular/core'
import {createEffect} from '@ngrx/effects'
import {Observable, of} from 'rxjs'
import {switchMap} from 'rxjs/operators'
import * as socketIO from 'socket.io-client'

import {Quote} from '@libs/schema'

import {ClientEnvironment, ENVIRONMENT} from '@client/environment'
import {QuoteActions} from './quote.actions'

@Injectable()
export class QuoteEffects {
  private io: socketIO.Socket

  constructor(
    @Inject(ENVIRONMENT) public environment: ClientEnvironment,
    @Inject(PLATFORM_ID) private platform: string,
  ) {
    if (isPlatformBrowser(this.platform)) {
      const options = this.environment.env === 'prod' ? {transports: ['websocket']} : {}
      this.io = socketIO.io(this.environment.api, options)
    }
  }

  listenForQuotes$ = createEffect(() =>
    this.quotesStream().pipe(switchMap(quote => of(QuoteActions.add({quote})))),
  )

  private quotesStream() {
    return new Observable<Quote>(observer => {
      if (!isPlatformBrowser(this.platform)) return
      this.io.on('quotes', (quote: Quote) => {
        observer.next(quote)
      })
      return () => this.io.off('quotes')
    })
  }
}
