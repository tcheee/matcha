// ngrx imports
import { createAction, props} from '@ngrx/store';

export const sendDatatoStore = createAction(
	'[Users] Get data from backend',
	props<{users : any}>()
)
