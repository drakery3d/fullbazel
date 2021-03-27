import {createFeatureSelector, createSelector} from '@ngrx/store'

import {AuthReducer} from './auth.reducer'

const state = createFeatureSelector<AuthReducer>('auth')

const user = createSelector(state, s => s.user)
const isInitialized = createSelector(state, s => s.isInitialized)

export const AuthSelectors = {user, isInitialized}
