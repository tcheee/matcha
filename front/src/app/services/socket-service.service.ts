import { Injectable } from '@angular/core';
import { Router} from '@angular/router';
import { Observable } from 'rxjs';
import { Observer } from 'rxjs';
import { io } from 'socket.io-client';
// socket
//import { Socket} from 'ngx-socket-io';

// ngrx imports
import { Store, } from '@ngrx/store';
// store imports
import { RootStoreState, SelfAction, UsersAction} from '../root-store';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class socketService {

  socket : any;
  constructor(
    //private socket : Socket,
    private store$: Store<RootStoreState.RootState>,
    private router: Router,
    ) { }
// SOCKET CONNECTION
    setUpSocketConnexion(){
      this.socket = io(environment.socketURL)
    }
    getData(mail : string) {
      console.log("EMIT")
      this.socket.emit("data", {mail : mail}, (response: any) => {
        if (response.data){
          this.store$.dispatch(SelfAction.sendDatatoStore({self: response.data}))
          this.store$.dispatch(UsersAction.sendDatatoStore({users: response.data}))
          this.router.navigate(['/home'])
          console.log(response)
        }
      });
    }

    // SOCKET CHAT
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

    // SOCKET LIKE/UNLIKE/BLOCK/NOTIF
    sendMatchAction(message: string, from : string, to : string){
      console.log(message, from, to)
      this.socket.emit(message, {from : from , to : to})
    }

  }
