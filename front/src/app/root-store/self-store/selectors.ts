// ngrx imports
import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';

// store imports
import { State, key } from './state'

// feature selector
export const selectSelfState: MemoizedSelector<object, State> = createFeatureSelector<State>(key);

// selectors
export const getAllStateData: MemoizedSelector<object, any> = createSelector(
	selectSelfState,
	(state: State): any => state
      );

export const isLogged: MemoizedSelector<object, boolean> = createSelector(
	selectSelfState,
	(state: State): any => state.login
      );

export const notificationsUnseen: MemoizedSelector<object, Array<string>> = createSelector(
	selectSelfState,
	(state: State): any => state.notficiations_unseen
      );
