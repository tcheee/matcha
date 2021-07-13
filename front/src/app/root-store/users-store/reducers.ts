// ngrx imports
import { Action, createReducer, on, } from '@ngrx/store';

// store imports
import { State, initialState } from './state';
import * as UsersAction from './actions';

const UsersReducer = createReducer(
	initialState,

  on(
	UsersAction.sendDatatoStore,
	(state, {users}): State => ({
	...state,
	users : users.users
	}
  )
));

export function reducers(state: State | undefined, action: Action) {
	return UsersReducer(state, action);
      }