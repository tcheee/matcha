export interface State {
    id: number;
    uuid: string;
    mail: string;
    first_name: string;
    last_name: string;
    age: number;
    genre: number;
    orientation: number;
    lat: number;
    lng: number; 
    biography: string;
    fame: number;
    last_connection: string; 
    interests: Array<string>;
    blocks: Array<string>;
    likes: Array<string>;
    matches: Array<string>;
    received_likes: Array<string>;
    received_unlikes: Array<string>;
    unlikes: Array<string>;
    visits: Array<string>;
    notifications: Array<string>;
    notficiations_unseen: string;
    messages_unseen: string;
    login: boolean;
    image: string;
    image1: string;
    image2: string;
    image3: string;
}

export const initialState: State = {
	id: 0,
    uuid: '',
	first_name: '',
    last_name: '',
    mail: '',
	age: 0,
	genre: 0,
	orientation: 0,
	lat: 0,
	lng: 0,
	biography: '',
	fame: 100,
	last_connection: '', 
    interests: [],
    blocks: [],
    likes: [],
    matches: [],
    received_likes: [],
    received_unlikes: [],
    unlikes: [],
    visits: [],
    login: false,
    notficiations_unseen: '',
    messages_unseen: '',
    notifications: [],
    image: '',
    image1: '',
    image2: '',
    image3: '',
};
      
export const key = 'self';