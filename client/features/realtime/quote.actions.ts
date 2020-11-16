import {createAction, props} from '@ngrx/store'

import {Quote} from '@libs/schema'

const add = createAction('quote/add', props<{quote: Quote}>())
const removeOne = createAction('quote/remove-one', props<{id: string}>())
const removeAll = createAction('quote/remove-all')

export const QuoteActions = {
  add,
  removeOne,
  removeAll,
}
