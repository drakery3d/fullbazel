import {createReducer, on} from '@ngrx/store'

import {WebSocketActions as Actions} from './websocket.actions'

export interface WebSocketReducer {
  connecting: boolean
  connected: boolean
  error?: string
}

export const websocketReducer = createReducer<WebSocketReducer>(
  {connecting: false, connected: false, error: undefined},
  on(Actions.connect, state => ({...state, connecting: true})),
  on(Actions.opened, state => ({...state, connecting: false, connected: true})),
  on(Actions.closed, (state, {reason}) => ({...state, connected: false, error: reason})),
  on(Actions.error, state => ({...state, connected: false, error: 'Something went wrong'})),
  on(Actions.disconnect, state => ({...state, connecting: false, connected: false})),
)
