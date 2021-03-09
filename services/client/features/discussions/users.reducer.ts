import {createEntityAdapter, EntityAdapter} from '@ngrx/entity'
import {createReducer, on} from '@ngrx/store'

import {User} from '@libs/schema'

import {DiscussionsActions} from './discussions.actions'
import {UsersReducer} from './discussions.state'

const adapter: EntityAdapter<User> = createEntityAdapter({
  selectId: (user: User) => user.id,
})

const initialState: UsersReducer = adapter.getInitialState()

export const usersReducer = createReducer(
  initialState,
  on(DiscussionsActions.receivedMessage, (state, {user}) => adapter.addOne(user, state)),
  on(DiscussionsActions.loadedExistingMessages, (state, {users}) => adapter.addMany(users, state)),
)

export const UsersReducerSelectors = adapter.getSelectors()
