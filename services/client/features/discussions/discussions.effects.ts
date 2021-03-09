import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {filter, map} from 'rxjs/operators'

import {DiscussionsMessagesIn, DiscussionsMessagesOut} from '@libs/enums'
import {WebSocketActions} from '@libs/websocket-store'

import {DiscussionsActions} from './discussions.actions'

@Injectable()
export class DiscussionsEffects {
  constructor(private actions$: Actions) {}

  sendMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DiscussionsActions.sendMessage),
      map(({content}) =>
        WebSocketActions.send({name: DiscussionsMessagesIn.SendMessage, payload: content}),
      ),
    ),
  )

  receiveMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WebSocketActions.message),
      filter(({name}) => name === DiscussionsMessagesOut.ReceiveMessage),
      map(({payload}) => {
        const {message, user} = payload
        return DiscussionsActions.receivedMessage({message, user})
      }),
    ),
  )

  existingMessages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WebSocketActions.message),
      filter(({name}) => name === DiscussionsMessagesOut.ExistingMessages),
      map(({payload}) => {
        const {messages, users} = payload
        return DiscussionsActions.loadedExistingMessages({messages, users})
      }),
    ),
  )
}
