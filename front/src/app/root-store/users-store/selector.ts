// ngrx imports
import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';

// store imports
import { State, key } from './state'

// feature selector
export const selectUsersState: MemoizedSelector<object, State> = createFeatureSelector<State>(key);

// selectors
export const getAllUsersStateData: MemoizedSelector<object, any> = createSelector(
	selectUsersState,
	(state: State): any => state
      );


