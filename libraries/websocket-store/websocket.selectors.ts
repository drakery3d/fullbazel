import {createFeatureSelector, createSelector} from '@ngrx/store'

import {WebsocketState} from './websocket.state'

const state = createFeatureSelector<WebsocketState>('websocket')

const connection = createSelector(state, s => s.connection)
const isConnected = createSelector(connection, s => s.connected)
const isConnecting = createSelector(connection, s => s.connecting)
const connectionError = createSelector(connection, s => s.error)

export const WebSocketSelectors = {
  connection,
  isConnected,
  isConnecting,
  connectionError,
}
