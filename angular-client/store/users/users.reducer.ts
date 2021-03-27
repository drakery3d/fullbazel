import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity'
import {createReducer, on} from '@ngrx/store'

import {User} from '@libs/schema'

import {MessagesActions} from '../messages'

export type UsersReducer = EntityState<User>

const adapter: EntityAdapter<User> = createEntityAdapter({
  selectId: (user: User) => user.id,
})

const initialState: UsersReducer = adapter.getInitialState()

export const usersReducer = createReducer(
  initialState,
  on(MessagesActions.received, (state, {user}) => adapter.addOne(user, state)),
  on(MessagesActions.loadedExisting, (state, {users}) => adapter.addMany(users, state)),
)

export const UsersReducerSelectors = adapter.getSelectors()
