import { Injectable} from '@angular/core';
import { Router} from '@angular/router';
import { Observable } from 'rxjs';
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
    setUpSocketConnexion(jwt : string, email : string){
      this.socket = io(environment.socketURL, {
        auth : {
        token : jwt,
        mail : email,
        }
      })
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
      this.socket.on('notification_update', (data: any) => {
        console.log(data);
        console.log("SOCKET UPDATE")
        this.store$.dispatch(SelfAction.NotificationUpdate({self : data}))
      });
      this.socket.on('login_update', (data : any) => {
        console.log("LOGIN/LOGOUT UPDATE");
        console.log(data.login)
      })
    }

    // SOCKET CHAT
    joinRoom(room:string) {
      this.socket.emit("room", {room: room});
    }

    leaveRoom(room:string) {
      this.socket.emit("leave-room", {room: room});
    }

    sendChat(from: string, to: string, content: string, room: string) {
      console.log(from, to, content, room);
      this.socket.emit("chat", {from_mail : from, to_mail: to, content: content, room: room})
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
      this.socket.emit(message, {from : from , to : to})
    }

    disconnect(){
      this.socket.disconnect()
    }

  }
