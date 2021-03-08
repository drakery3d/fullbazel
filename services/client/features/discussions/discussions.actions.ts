import {createAction, props} from '@ngrx/store'

import {Message} from '@libs/schema'

const sendMessage = createAction('discussions.sendMessage', props<{content: string}>())
const receivedMessage = createAction('discussions.receivedMessage', props<{message: Message}>())

export const DiscussionsActions = {sendMessage, receivedMessage}
