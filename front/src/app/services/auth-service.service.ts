import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { baseUrl, resetPasswordUrl, registerUrl, changePasswordUrl} from 'src/environments/environment';

// socket
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(
    private http: HttpClient,
    private socket : Socket,
//    private handler : HttpBackend,
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

  changePassword(data : any) {
    return this.http.post(`${changePasswordUrl}`, data).subscribe(data => console.log(data))
  }

  register(data : any){
    const payload: FormData = new FormData();
    payload.append('age', data.age);
    payload.append('biography', data.biography);
    payload.append('email', data.email);
    payload.append('firstName', data.firstName);
    payload.append('lastName', data.lastName);
    payload.append('gender', data.gender);
    payload.append('orientation', data.orientation);
    payload.append('password', data.password);
    payload.append('lat', data.lat);
    payload.append('lng', data.lng);
    payload.append('interest', data.interest);
    payload.append('img', data.img);

    payload.forEach((value, key) => {
    console.log("key %s: value %s", key, value);
    })
   // this.http = new HttpClient(this.handler);
    this.http.post(`${registerUrl}`, payload)
    .subscribe(data => console.log())
    }
  }
