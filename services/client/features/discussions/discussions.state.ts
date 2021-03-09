import {EntityState} from '@ngrx/entity'

import {Message, User} from '@libs/schema'

export interface DiscussionsState {
  discussions: DiscussionsReducer
  users: UsersReducer
}

export type DiscussionsReducer = EntityState<Message>
export type UsersReducer = EntityState<User>
