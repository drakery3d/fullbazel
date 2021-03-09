import {createFeatureSelector, createSelector} from '@ngrx/store'

import {UsersReducer, UsersReducerSelectors} from './users.reducer'

const state = createFeatureSelector<UsersReducer>('users')
const entities = createSelector(state, UsersReducerSelectors.selectEntities)

export const UserssSeletors = {entities}
