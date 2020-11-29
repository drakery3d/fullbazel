import {Inject, Injectable} from '@angular/core'
import {createEffect} from '@ngrx/effects'
import {Observable, of} from 'rxjs'
import {switchMap} from 'rxjs/operators'
import * as socketIO from 'socket.io-client'

import {Quote} from '@libs/schema'

import {ClientEnvironment, ENVIRONMENT} from '@client/environment'
import {QuoteActions} from './quote.actions'

@Injectable()
export class QuoteEffects {
  private io = socketIO.io(this.environment.api, {transports: ['websocket']})

  constructor(@Inject(ENVIRONMENT) public environment: ClientEnvironment) {}

  listenForQuotes$ = createEffect(() =>
    this.quotesStream().pipe(switchMap(quote => of(QuoteActions.add({quote})))),
  )

  private quotesStream() {
    return new Observable<Quote>(observer => {
      this.io.on('quotes', (quote: Quote) => {
        observer.next(quote)
      })
      return () => this.io.off('quotes')
    })
  }
}
