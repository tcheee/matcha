export interface State {
    id: number;
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
}

export const initialState: State = {
	id: undefined,
	first_name: undefined,
	last_name: undefined,
	age: undefined,
	genre: undefined,
	orientation: undefined,
	lat: undefined,
	lng: undefined,
	biography: undefined,
	fame: 100,
	last_connection: undefined, 
    interests: undefined,
    blocks: undefined,
    likes: undefined,
    matches: undefined,
    received_likes: undefined,
    received_unlikes: undefined,
    unlikes: undefined,
    visits: undefined,
};
      
export const key = 'users';