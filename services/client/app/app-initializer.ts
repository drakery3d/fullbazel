import {Store} from '@ngrx/store'
import {of} from 'rxjs'
import {catchError, take} from 'rxjs/operators'

import {ClientEnvironment} from '@client/environment'
import {WebSocketActions} from '@libs/websocket-store'

import {AuthService} from './auth.service'

// TODO implement with ngrx

export const initApplication = (
  authService: AuthService,
  store: Store,
  environment: ClientEnvironment,
) => {
  return () => {
    return new Promise(resolve => {
      authService
        .signIn()
        .pipe(
          take(1),
          catchError(() => of(undefined)),
        )
        .subscribe(response => {
          if (response?.user) {
            console.log('Authenticated', response.user)
            store.dispatch(WebSocketActions.connect({url: environment.websocket}))
          } else {
            console.log('Not authenticated')
          }
          resolve(undefined)
        })
    })
  }
}
