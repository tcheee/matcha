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
	id: self.self.user[0].id,
	mail: self.self.user[0].mail,
	first_name: self.self.user[0].first_name,
	last_name: self.self.user[0].last_name,
	age: self.self.user[0].age,
	genre: self.self.user[0].genre,
	orientation: self.self.user[0].orientation,
	lat: self.self.user[0].lat,
	lng: self.self.user[0].lng,
	biography: self.self.user[0].biography,
	last_connection: self.self.user[0].last_connection,
	interests: self.self.user[0].interests,
	blocks: self.self.blocks,
	likes: self.self.likes,
	matches: self.self.matches,
	received_likes: self.self.received_likes,
	received_unlikes: self.self.received_unlikes,
	unlikes: self.self.unlikes,
	visits: self.self.uservisits,
	login: self.self.login,
	notficiations_unseen: self.self.notifications_unseen,
	messages_unseen : self.self.messages_unseen,
	notifications: self.self.notifications,
	image: "data:image/jpeg;base64," + self.self.images.image0,
//	image1: "data:image/jpeg;base64," + self.self.images.image1,
//	image2: "data:image/jpeg;base64," + self.self.images.image2,
//	image3 : "data:image/jpeg;base64," + self.self.images.image3,
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
  )
)
export function reducers(state: State | undefined, action: Action) {
	return SelfReducer(state, action);
      }