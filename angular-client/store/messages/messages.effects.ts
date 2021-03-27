import {Injectable} from '@angular/core'
import {Router} from '@angular/router'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {Store} from '@ngrx/store'
import {filter, map, switchMap, withLatestFrom} from 'rxjs/operators'

import {AuthSelectors} from '@client/store'
import {DiscussionsMessagesIn, DiscussionsMessagesOut} from '@libs/enums'
import {WebSocketActions} from '@libs/websocket-store'

import {MessagesActions} from './messages.actions'

@Injectable()
export class MessagesEffects {
  constructor(private actions$: Actions, private store: Store, private router: Router) {}

  sendMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MessagesActions.send),
      map(({content}) =>
        WebSocketActions.send({name: DiscussionsMessagesIn.SendMessage, payload: content}),
      ),
    ),
  )

  loadExistingMessages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MessagesActions.loadExisting),
      map(() =>
        WebSocketActions.send({name: DiscussionsMessagesIn.LoadMessages, payload: undefined}),
      ),
    ),
  )

  receiveMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WebSocketActions.message),
      filter(({name}) => name === DiscussionsMessagesOut.ReceiveMessage),
      withLatestFrom(this.store.select(AuthSelectors.user)),
      switchMap(([{payload}, authenticatedUser]) => {
        const {message, user} = payload
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const actions: any[] = [MessagesActions.received({message, user})]
        if (authenticatedUser?.id !== message.userId && this.router.url !== '/discussions') {
          actions.push(MessagesActions.receivedUnread({messageId: message.id}))
        }
        return actions
      }),
    ),
  )

  existingMessages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WebSocketActions.message),
      filter(({name}) => name === DiscussionsMessagesOut.ExistingMessages),
      map(({payload}) => {
        const {messages, users} = payload
        return MessagesActions.loadedExisting({messages, users})
      }),
    ),
  )
}
