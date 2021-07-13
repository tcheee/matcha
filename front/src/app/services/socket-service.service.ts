import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Observer } from 'rxjs';

// socket
import { Socket } from 'ngx-socket-io';

// ngrx imports
import { Store, } from '@ngrx/store';
// store imports
import { RootStoreState, SelfAction, UsersAction} from '../root-store';

@Injectable({
  providedIn: 'root'
})
export class socketService {

  constructor(
    private socket : Socket,
    private store$: Store<RootStoreState.RootState>
    ) { }

    getData(mail : string) {
      console.log("EMIT")
      this.socket.emit("data", {mail : mail}, (response: any) => {
        if (response.data){
          this.store$.dispatch(SelfAction.sendDatatoStore({self: response.data}))
          this.store$.dispatch(UsersAction.sendDatatoStore({users: response.data}))
          console.log(response)
        }
      });
    }

    joinRoom(room:string) {
      this.socket.emit("room", {room: room});
    }

    sendChat(from: string, to: string, content: string, room: string) {
      console.log(from, to, content, room);
      this.socket.emit("chat", {from : from, to: to, content: content, room: room})
    }

    public onChat() {
        return new Observable (observer => {
            this.socket.on('chat', (data: any) => {
                console.log(data);
                observer.next(data)});
        });
    }

  }