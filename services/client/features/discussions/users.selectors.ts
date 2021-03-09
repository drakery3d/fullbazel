import {createFeatureSelector, createSelector} from '@ngrx/store'

import {DiscussionsState} from './discussions.state'
import {UsersReducerSelectors} from './users.reducer'

const feature = createFeatureSelector<DiscussionsState>('discussions')
const state = createSelector(feature, (state: DiscussionsState) => state.users)
const entities = createSelector(state, UsersReducerSelectors.selectEntities)

export const UserssSeletors = {entities}
