import {InjectionToken} from '@angular/core'

import dev from './dev'
import prod from './prod'

type ClientEnvironment = typeof prod
const ENVIRONMENT = new InjectionToken<ClientEnvironment>('CLIENT_ENVIRONMENT')

export {ClientEnvironment, dev, prod, ENVIRONMENT}
