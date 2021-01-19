import {InjectionToken} from '@angular/core'
import dev from '@generated/config/client.environment.dev'
/**
 * Fortunately, Rollup is smart enough to remove the
 * environment which is not needed when bundling the code
 */
import prod from '@generated/config/client.environment.prod'

type ClientEnvironment = typeof prod
const ENVIRONMENT = new InjectionToken<ClientEnvironment>('CLIENT_ENVIRONMENT')

export {ClientEnvironment, dev, prod, ENVIRONMENT}
