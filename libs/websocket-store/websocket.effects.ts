import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {Action} from '@ngrx/store'
import {Observable} from 'rxjs'
import {switchMap, tap} from 'rxjs/operators'

import {SocketMessage} from '@libs/schema'

import {WebSocketActions} from './websocket.actions'

@Injectable()
export class WebSocketEffects {
  private url = 'ws://localhost:3000'
  private websocket!: WebSocket

  constructor(private actions$: Actions) {}

  connect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WebSocketActions.connect),
      switchMap(() => {
        return new Observable<Action>(observer => {
          this.websocket = new WebSocket(this.url)

          this.websocket.onopen = () => observer.next(WebSocketActions.opened())
          this.websocket.onclose = event =>
            observer.next(WebSocketActions.closed({reason: event.reason}))
          this.websocket.onerror = () => observer.next(WebSocketActions.error())
          this.websocket.onmessage = event => {
            const message = JSON.parse(event.data) as SocketMessage
            observer.next(WebSocketActions.message({name: message.name, payload: message.payload}))
          }
        })
      }),
    ),
  )

  disconnect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(WebSocketActions.disconnect),
        tap(() => {
          this.websocket.close()
        }),
      ),
    {dispatch: false},
  )

  sendMessages$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(WebSocketActions.send),
        tap(({name, payload}) => {
          const messsage: SocketMessage = {name, payload}
          this.websocket.send(JSON.stringify(messsage))
        }),
      ),
    {dispatch: false},
  )
}
