import {createAction, props} from '@ngrx/store'

import {Message, User} from '@libs/schema'

const sendMessage = createAction('discussions.sendMessage', props<{content: string}>())
const receivedMessage = createAction(
  'discussions.receivedMessage',
  props<{message: Message; user: User}>(),
)
const loadedExistingMessages = createAction(
  'discussions.loadedExistingMessages',
  props<{messages: Message[]; users: User[]}>(),
)

export const DiscussionsActions = {sendMessage, receivedMessage, loadedExistingMessages}
