import {createFeatureSelector, createSelector} from '@ngrx/store'

import {MessagesReducer, MessagesReducerSelectors} from './messages.reducer'

const state = createFeatureSelector<MessagesReducer>('messages')
const messages = createSelector(state, MessagesReducerSelectors.selectAll)
const messagesReverse = createSelector(messages, msgs => msgs.reverse())
const unreadIds = createSelector(state, s => s.unreadIds)
const unreadCount = createSelector(state, s => s.unreadIds.length)

export const MessagesSeletors = {messages, messagesReverse, unreadCount, unreadIds}
