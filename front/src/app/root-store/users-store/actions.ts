// ngrx imports
import { createAction, props} from '@ngrx/store';

export const sendDatatoStore = createAction(
	'[Users] Get data from backend',
	props<{users : any}>()
)

export const updateIsOnline = createAction(
	'[Users] Update is Online',
	props<{isOnline : boolean, mail : string}>()
)
