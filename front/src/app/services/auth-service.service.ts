import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { baseUrl } from 'src/environments/environment';

// socket
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(
    private http:HttpClient,
    private socket : Socket,
    ) { }

    getData() {
      this.socket.emit('data', {id : 1003});
    }
    getResponseData() {
      return this.socket.fromEvent('data').pipe(map((data: any) => console.log(data)));
    }



  login(data : any) :Observable<any>{
    return this.http.post(`${baseUrl}`, data, {withCredentials: true});
  }
}
