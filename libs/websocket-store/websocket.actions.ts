import {createAction, props} from '@ngrx/store'

const connect = createAction('websocket.connect', props<{url: string}>())
const opened = createAction('websocket.connected')
const closed = createAction('websocket.closed', props<{reason: string}>())
const error = createAction('websocket.error')
const disconnect = createAction('websocket.disconnect')

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const send = createAction('websocket.send', props<{name: string; payload: any}>())
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const message = createAction('websocket.message', props<{name: string; payload: any}>())

export const WebSocketActions = {connect, opened, closed, error, send, message, disconnect}
