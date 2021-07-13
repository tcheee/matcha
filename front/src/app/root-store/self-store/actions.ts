// ngrx imports
import { createAction, props} from '@ngrx/store';

export const sendDatatoStore = createAction(
	'[State] Get data from backend',
	props<{self : any}>()
)
