import {createAction, props} from '@ngrx/store'

import {Message, User} from '@libs/schema'

const send = createAction('messages.send', props<{content: string}>())
const received = createAction('messages.received', props<{message: Message; user: User}>())
const receivedUnread = createAction('messages.receivedUnread', props<{messageId: string}>())
const clearUnread = createAction('messages.clearUnread')
const loadExisting = createAction('messages.loadExisting')
const loadedExisting = createAction(
  'messages.loadedExisting',
  props<{messages: Message[]; users: User[]}>(),
)

export const MessagesActions = {
  send,
  received,
  receivedUnread,
  clearUnread,
  loadExisting,
  loadedExisting,
}
