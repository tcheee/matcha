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

export const removeUnseenMessages = createAction(
	'[Self] Remove Unseen Messages',
)

export const likeAction = createAction(
	'[Self] Like Action',
	props<{from : string, to : string}>()
)

export const unLikeAction = createAction(
	'[Self] unLike Action',
	props<{from : string, to : string}>()
)
export const blockAction = createAction(
	'[Self] Block Action',
	props<{from : string, to : string}>()
)
export const VisitAction = createAction(
	'[Self] visit Action',
	props<{from : string, to : string}>()
)