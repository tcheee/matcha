import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { baseUrl, resetPasswordUrl, registerUrl } from 'src/environments/environment';

// socket
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(
    private http: HttpClient,
    private socket : Socket,
    ) { }

    getData(id : number) {
      console.log("EMIT")
      this.socket.emit("data", {id : id}, (response: any) => {
        console.log("REPONSE")
        console.log(response)
      });
    }
    // getResponseData() {
    //   console.log("RESPONSE")
    //   return this.socket.fromEvent('data').pipe(map((data) => console.log(data)));
    // }



  login(data : any) :Observable<any>{
    return this.http.post(`${baseUrl}`, data, {withCredentials: true});
  }
  resetPassword(data : any) {
    return this.http.post(`${resetPasswordUrl}`, data).subscribe(data => console.log(data))
  }
  register(data : any){
    this.http.post(`${registerUrl}`, data).subscribe(data => console.log(data))
  }
  }
