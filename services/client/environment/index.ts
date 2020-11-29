import {InjectionToken} from '@angular/core'

import {env} from '@generated/config/client.environment'

export type ClientEnvironment = typeof env
export const environment = env
export const ENVIRONMENT = new InjectionToken<ClientEnvironment>('CLIENT_ENVIRONMENT')
