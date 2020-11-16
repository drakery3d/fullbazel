import {InjectionToken} from '@angular/core'

export interface ClientEnvironment {
  environment: string
  api: string
}

export const ENVIRONMENT = new InjectionToken<ClientEnvironment>('CLIENT_ENVIRONMENT')

export * from './environment'
