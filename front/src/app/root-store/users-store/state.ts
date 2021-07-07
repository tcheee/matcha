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
    is_active: boolean;
    interests: Array<string>;
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
	is_active: undefined,
	interests: undefined,
};
      
export const key = 'users';