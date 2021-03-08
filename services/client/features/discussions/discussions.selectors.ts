import {createFeatureSelector, createSelector} from '@ngrx/store'

import {DiscussionsReducerSelectors} from './discussions.reducer'
import {DiscussionsReducer} from './discussions.state'

interface State {
  discussions: DiscussionsReducer
}

const selectFeatureState = createFeatureSelector<State>('discussions')
const state = createSelector(selectFeatureState, (state: State) => state.discussions)
const messages = createSelector(state, DiscussionsReducerSelectors.selectAll)

export const DiscussionsSeletors = {messages}
