export interface SocketMessage<T = unknown> {
  name: string
  payload: T
}
