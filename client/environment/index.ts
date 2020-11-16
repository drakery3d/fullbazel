import {InjectionToken} from '@angular/core'

export interface ClientEnvironment {
  environment: string
  webSocketServer: string
}

export const ENVIRONMENT = new InjectionToken<ClientEnvironment>('CLIENT_ENVIRONMENT')

export * from './environment'
