import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {filter, map} from 'rxjs/operators'

import {Quote} from '@libs/schema'
import {WebSocketActions} from '@libs/websocket-store'

import {QuoteActions} from './quote.actions'

@Injectable()
export class QuoteEffects {
  constructor(private actions$: Actions) {}

  quotes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WebSocketActions.message),
      filter(({name}) => name === 'quote'),
      map(({payload}) => QuoteActions.add({quote: payload as Quote})),
    ),
  )
}
