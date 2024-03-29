// ngrx imports
import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, filter, first} from 'rxjs/operators';
import { getAllUsersStateData}  from '../../root-store/users-store/selector'

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

export const notificationsUnseen: MemoizedSelector<object, string> = createSelector(
	selectSelfState,
	(state: State): any => state.notficiations_unseen
      );

export const mail: MemoizedSelector<object, string> = createSelector(
	selectSelfState,
	(state: State): any => state.mail
)

export const messagesUnseen: MemoizedSelector<object, string> = createSelector (
	selectSelfState,
	(state : State): any => state.messages_unseen
)


export const getBlockData: MemoizedSelector<object, any> = createSelector(
	selectSelfState,
	(state : State): any => state.blocks
)
