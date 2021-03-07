import {createReducer, on} from '@ngrx/store'

import {User} from '@libs/schema'

import {AuthActions as Actions} from './auth.actions'

export interface AuthReducer {
  user?: User
  isInitialized: boolean
}

export const authReducer = createReducer<AuthReducer>(
  {user: undefined, isInitialized: false},
  on(Actions.authenticated, (state, {user}) => ({...state, user, isInitialized: true})),
  on(Actions.failedToAuthenticate, state => ({...state, user: undefined, isInitialized: true})),
  on(Actions.signedOut, state => ({...state, user: undefined, isInitialized: true})),
)
