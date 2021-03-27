import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity'
import {createReducer, on} from '@ngrx/store'

import {Message} from '@libs/schema'

import {MessagesActions} from './messages.actions'

export interface MessagesReducer extends EntityState<Message> {
  unreadIds: string[]
}

const adapter: EntityAdapter<Message> = createEntityAdapter({
  selectId: (message: Message) => message.id,
})

const initialState: MessagesReducer = adapter.getInitialState({unreadIds: []})

export const messagesReducer = createReducer(
  initialState,
  on(MessagesActions.received, (state, {message}) => adapter.addOne(message, state)),
  on(MessagesActions.receivedUnread, (state, {messageId}) => ({
    ...state,
    unreadIds: [...state.unreadIds, messageId],
  })),
  on(MessagesActions.clearUnread, state => ({...state, unreadIds: []})),
  on(MessagesActions.loadedExisting, (state, {messages}) => adapter.addMany(messages, state)),
)

export const MessagesReducerSelectors = adapter.getSelectors()
