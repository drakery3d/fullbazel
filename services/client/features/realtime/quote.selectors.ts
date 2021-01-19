import {createFeatureSelector, createSelector} from '@ngrx/store'

import {QuoteReducerSelectors} from './quote.reducer'
import {QuoteReducer} from './quote.state'

interface State {
  quotes: QuoteReducer
}

const selectFeatureState = createFeatureSelector<State>('realtime')
const quoteState = createSelector(selectFeatureState, (state: State) => state.quotes)
const quotes = createSelector(quoteState, QuoteReducerSelectors.selectAll)

export const QuoteSeletors = {quotes}
