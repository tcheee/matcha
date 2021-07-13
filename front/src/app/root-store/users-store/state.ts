import { User }  from '../../models/users';

export interface State {
	users : Array<User>
    }
    
export const initialState: State = {
	users: [],
    };
	  
    export const key = 'users';