// ngrx imports
import { Action, createReducer, on, } from '@ngrx/store';

// store imports
import { State, initialState } from './state';
import * as SelfAction from './actions';

const SelfReducer = createReducer(
	initialState,

  on(
	SelfAction.sendDatatoStore,
	(state, {self}): State => ({
	...state,
	id: self.self.user.id,
	uuid: self.self.user.uuid,
	mail: self.self.user.mail,
	first_name: self.self.user.first_name,
	last_name: self.self.user.last_name,
	age: self.self.user.age,
	genre: self.self.user.genre,
	orientation: self.self.user.orientation,
	lat: self.self.user.lat,
	lng: self.self.user.lng,
	biography: self.self.user.biography,
	last_connection: self.self.user.last_connection,
	interests: self.self.user.interests,
	blocks: self.self.blocks,
	likes: self.self.likes,
	matches: self.self.matches,
	received_likes: self.self.received_likes,
	received_unlikes: self.self.received_unlikes,
	unlikes: self.self.unlikes,
	visits: self.self.visits,
	login: self.self.login,
	notficiations_unseen: self.self.notifications_unseen,
	messages_unseen : self.self.messages_unseen,
	notifications: self.self.notifications,
	image: "data:image/jpeg;base64," + self.self.images.image0,
	image1: "data:image/jpeg;base64," + self.self.images.image1,
	image2: "data:image/jpeg;base64," + self.self.images.image2,
	image3 : "data:image/jpeg;base64," + self.self.images.image3,
	})
  ),
  on (
	  SelfAction.NotificationUpdate,
	  (state, {self}): State => ({
		  ...state,
		  blocks : self.data.blocks,
		  likes : self.data.likes,
		  matches : self.data.matches,
		  received_likes: self.data.received_likes,
		  received_unlikes : self.data.received_unlikes,
		  unlikes : self.data.unlikes,
		  visits: self.data.visits,
		  notficiations_unseen: self.data.notifications_unseen,
		  messages_unseen : self.data.messages_unseen,
		  notifications: self.data.notifications,

	  })
  ),
  on (
	  SelfAction.removeUnseenNotifications,
	  (state): State => ({
		 ...state,
		 notficiations_unseen : "0",
	  })
  

  ),
  on (
	SelfAction.removeUnseenMessages,
	(state): State => ({
	       ...state,
	       messages_unseen : "0",
	})
  ),
  on (
	  SelfAction.updateSelf,
	  (state, {user , images}): State => ({
		  ...state,
		  image: "data:image/jpeg;base64," + images.image0,
		  image1: "data:image/jpeg;base64," + images.image1,
		  image2: "data:image/jpeg;base64," + images.image2,
		  image3 : "data:image/jpeg;base64," + images.image3,
		  id: user.id,
		  mail: user.email,
		  first_name: user.firstName,
		  last_name: user.lastName,
		  age: user.age,
		  genre: user.gender,
		  orientation: user.orientation,
		  lat: user.lat,
		  lng: user.lng,
		  biography: user.biography,
		  interests: user.interest,
	  })
  ),
  on (
	SelfAction.blockAction,
	(state, {blocks}): State => ({
		...state,
		blocks: blocks,
	})

  ),
)
export function reducers(state: State | undefined, action: Action) {
	return SelfReducer(state, action);
      }