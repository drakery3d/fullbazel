import {Store} from '@ngrx/store'
import {of} from 'rxjs'
import {catchError, take} from 'rxjs/operators'

import {WebSocketActions} from '@libs/websocket-store'

import {AuthService} from './auth.service'

// TODO implement with ngrx

export const initApplication = (authService: AuthService, store: Store) => {
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
            store.dispatch(WebSocketActions.connect())
          } else {
            console.log('Not authenticated')
          }
          resolve(undefined)
        })
    })
  }
}
