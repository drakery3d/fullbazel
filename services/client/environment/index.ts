import {InjectionToken} from '@angular/core'

/**
 * Fortunately, Rollup is smart enough to remove the
 * environment which is not needed when bundling the code
 */
import prod from '@generated/config/client.environment.prod'
import dev from '@generated/config/client.environment.dev'

type ClientEnvironment = typeof prod
const ENVIRONMENT = new InjectionToken<ClientEnvironment>('CLIENT_ENVIRONMENT')

export {ClientEnvironment, dev, prod, ENVIRONMENT}
