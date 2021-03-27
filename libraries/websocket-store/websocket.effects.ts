import {isPlatformBrowser} from '@angular/common'
import {Inject, Injectable, PLATFORM_ID} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {Action} from '@ngrx/store'
import {Observable} from 'rxjs'
import {switchMap, tap} from 'rxjs/operators'

import {SocketMessage} from '@libs/schema'

import {WebSocketActions} from './websocket.actions'

@Injectable()
export class WebSocketEffects {
  private websocket!: WebSocket

  constructor(private actions$: Actions, @Inject(PLATFORM_ID) private platform: string) {}

  connect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WebSocketActions.connect),
      switchMap(({url}) => {
        return new Observable<Action>(observer => {
          if (isPlatformBrowser(this.platform)) {
            this.websocket = new WebSocket(url)
            this.websocket.onopen = () => {
              console.log('[websocket] opened')
              observer.next(WebSocketActions.opened())
            }
            this.websocket.onclose = event => {
              console.log('[websocket] closed', event.reason)
              observer.next(WebSocketActions.closed({reason: event.reason}))
            }
            this.websocket.onerror = () => {
              console.log('[websocket] error')
              observer.next(WebSocketActions.error())
            }
            this.websocket.onmessage = event => {
              const message = JSON.parse(event.data) as SocketMessage
              observer.next(
                WebSocketActions.message({name: message.name, payload: message.payload}),
              )
            }
          } else {
            observer.next(WebSocketActions.error())
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
