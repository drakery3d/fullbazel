import {createFeatureSelector, createSelector} from '@ngrx/store'

import {DiscussionsReducerSelectors} from './discussions.reducer'
import {DiscussionsState} from './discussions.state'

const feature = createFeatureSelector<DiscussionsState>('discussions')
const state = createSelector(feature, (state: DiscussionsState) => state.discussions)
const messages = createSelector(state, DiscussionsReducerSelectors.selectAll)
const messagesReverse = createSelector(messages, msgs => msgs.reverse())

export const DiscussionsSeletors = {messages, messagesReverse}
