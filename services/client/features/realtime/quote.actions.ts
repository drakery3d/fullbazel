import {createAction, props} from '@ngrx/store'

import {Quote} from '@libs/schema'

const add = createAction('quote.add', props<{quote: Quote}>())
const removeOne = createAction('quote.remove-one', props<{id: string}>())
const removeAll = createAction('quote.remove-all')

const startStreaming = createAction('quote.start-streaming')
const stopStreaming = createAction('quote.stop-streaming')

export const QuoteActions = {
  add,
  removeOne,
  removeAll,
  startStreaming,
  stopStreaming,
}
