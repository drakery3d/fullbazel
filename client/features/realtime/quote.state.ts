import {EntityState} from '@ngrx/entity'

import {Quote} from '@libs/schema'

export interface QuoteReducer extends EntityState<Quote> {
  count: number
}
