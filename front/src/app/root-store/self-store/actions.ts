// ngrx imports
import { createAction, props} from '@ngrx/store';

export const sendDatatoStore = createAction(
	'[State] Get data from backend',
	props<{self : any}>()
)

export const updateSelf = createAction(
	'[Self] Update self store',
	props<{ user : any, images : any}>()
)

export const removeUnseenNotifications = createAction(
	'[Self] Remove Unseen Notification',
)
