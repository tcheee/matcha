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
),
  on(
	 UsersAction.updateIsOnline,
	  (state ,{isOnline, mail}): State => {
		const index = state.users.findIndex((user : any) => user.mail === mail); //finding index of the item
		return { 
			 ...state,
			 users : state.users.map((content, i) => i === index ? {...content, is_online : isOnline} : content)
		}
		}

  ));


export function reducers(state: State | undefined, action: Action) {
	return UsersReducer(state, action);
      }