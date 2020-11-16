import {createFeatureSelector, createSelector} from '@ngrx/store'

import {IRouterState} from './router.state'

const state = createFeatureSelector<IRouterState>('router')
const routerState = createSelector(state, router => router && router.state)

const queryParam = (key: string) => createSelector(routerState, router => router?.queryParams[key])
const param = (key: string) => createSelector(routerState, router => router?.params[key])

export const RouterSelectors = {routerState, queryParam, param}
