import {HttpClient} from '@angular/common/http'
import {Inject, Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {of} from 'rxjs'
import {catchError, map, switchMap} from 'rxjs/operators'

import {ClientEnvironment, ENVIRONMENT} from '@client/environment'
import {User} from '@libs/schema'

import {AuthActions} from './auth.actions'

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    @Inject(ENVIRONMENT) private environment: ClientEnvironment,
  ) {}

  tryToAuthenticate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.tryToAuthenticate),
      switchMap(() => {
        return this.http
          .post<{user: User}>(`${this.environment.api}/signin`, {}, {withCredentials: true})
          .pipe(
            map(({user}) => AuthActions.authenticated({user})),
            catchError(() => of(AuthActions.failedToAuthenticate())),
          )
      }),
    ),
  )

  signIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signIn),
      switchMap(({code}) => {
        return this.http
          .post<{user: User}>(`${this.environment.api}/signin`, {code}, {withCredentials: true})
          .pipe(
            map(({user}) => AuthActions.authenticated({user})),
            catchError(() => of(AuthActions.failedToAuthenticate())),
          )
      }),
    ),
  )

  signOut$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signOut),
      switchMap(() => {
        return this.http.post(`${this.environment.api}/signout`, {}, {withCredentials: true}).pipe(
          map(() => AuthActions.signedOut()),
          catchError(() => of(AuthActions.failedToSignOut())),
        )
      }),
    ),
  )
}