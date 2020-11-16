import {createReducer, on} from '@ngrx/store'
import {createEntityAdapter, EntityAdapter} from '@ngrx/entity'

import {Quote} from '@libs/schema'

import {QuoteReducer} from './quote.state'
import {QuoteActions} from './quote.actions'

const adapter: EntityAdapter<Quote> = createEntityAdapter({
  selectId: (quote: Quote) => quote.id,
})

const initialState: QuoteReducer = adapter.getInitialState({count: 0})

export const quoteReducer = createReducer(
  initialState,

  on(QuoteActions.add, (state, {quote}) =>
    adapter.addOne(quote, {...state, count: state.count + 1}),
  ),
  on(QuoteActions.removeOne, (state, {id}) =>
    adapter.removeOne(id, {...state, count: state.count - 1}),
  ),
  on(QuoteActions.removeAll, state => adapter.removeAll({...state, count: 0})),
)

export const QuoteReducerSelectors = {
  selectAll: adapter.getSelectors().selectAll,
}
