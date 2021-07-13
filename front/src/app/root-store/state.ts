// import state
import { SelfState } from './self-store';
import { UsersState} from './users-store';

export interface RootState{
[SelfState.key]:  SelfState.State;
[UsersState.key]: UsersState.State;
}