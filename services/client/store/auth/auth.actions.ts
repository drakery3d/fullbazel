import {createAction, props} from '@ngrx/store'

import {User} from '@libs/schema'

const signIn = createAction('auth.signIn', props<{code: string}>())
const tryToAuthenticate = createAction('auth.tryToAuthenticate')
const authenticated = createAction('auth.authenticated', props<{user: User}>())
const failedToAuthenticate = createAction('auth.failedToAuthenticate')

export const AuthActions = {signIn, tryToAuthenticate, authenticated, failedToAuthenticate}
