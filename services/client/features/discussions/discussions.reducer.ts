import {createEntityAdapter, EntityAdapter} from '@ngrx/entity'
import {createReducer, on} from '@ngrx/store'

import {Message} from '@libs/schema'

import {DiscussionsActions} from './discussions.actions'
import {DiscussionsReducer} from './discussions.state'

const adapter: EntityAdapter<Message> = createEntityAdapter({
  selectId: (message: Message) => message.id,
})

const initialState: DiscussionsReducer = adapter.getInitialState()

export const discussionsReducer = createReducer(
  initialState,
  on(DiscussionsActions.receivedMessage, (state, {message}) => adapter.addOne(message, state)),
  on(DiscussionsActions.loadedExistingMessages, (state, {messages}) =>
    adapter.addMany(messages, state),
  ),
)

export const DiscussionsReducerSelectors = adapter.getSelectors()
