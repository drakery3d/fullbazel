import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {filter, map} from 'rxjs/operators'

import {QuoteMessagesIn, QuoteMessagesOut} from '@libs/enums'
import {Quote} from '@libs/schema'
import {WebSocketActions} from '@libs/websocket-store'

import {QuoteActions} from './quote.actions'

@Injectable()
export class QuoteEffects {
  constructor(private actions$: Actions) {}

  startStreaming$ = createEffect(() =>
    this.actions$.pipe(
      ofType(QuoteActions.startStreaming),
      map(() => WebSocketActions.send({name: QuoteMessagesIn.StartStreaming, payload: undefined})),
    ),
  )

  stopStreaming$ = createEffect(() =>
    this.actions$.pipe(
      ofType(QuoteActions.stopStreaming),
      map(() => WebSocketActions.send({name: QuoteMessagesIn.StopStreaming, payload: undefined})),
    ),
  )

  quotes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WebSocketActions.message),
      filter(({name}) => name === QuoteMessagesOut.Send),
      map(({payload}) => QuoteActions.add({quote: payload as Quote})),
    ),
  )
}
