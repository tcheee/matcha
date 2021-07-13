// import state
import { SelfState } from './self-store'


export interface RootState{
[SelfState.key]:  SelfState.State;
}