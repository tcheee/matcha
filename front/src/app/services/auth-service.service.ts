import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { baseUrl, resetPasswordUrl, registerUrl, changePasswordUrl, updateUrl, orderMessageUrl, messageHistoryUrl} from 'src/environments/environment';

// ngrx imports
import { Store, } from '@ngrx/store';
// store imports
import { RootStoreState, SelfAction, UsersAction} from '../root-store';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(
    private http: HttpClient,
    private store$: Store<RootStoreState.RootState>
//    private handler : HttpBackend,
    ) { }

  login(data : any) :Observable<any>{
    return this.http.post(`${baseUrl}`, data, {withCredentials: true});
  }

  getOrderMessages(data : any) :Observable<any>{
    console.log(data);
    return this.http.get(`${orderMessageUrl}`, {withCredentials: true, params: {email: data}});
  }

  getMessagesHistory(data : any) :Observable<any>{
    return this.http.get(`${messageHistoryUrl}`, {withCredentials: true, params: {email: data}});
  }

  resetPassword(data : any) {
    return this.http.post(`${resetPasswordUrl}`, data).subscribe(data => console.log(data))
  }

  changePassword(data : any) {
    return this.http.post(`${changePasswordUrl}`, data).subscribe(data => console.log(data))
  }

  register(data : any){
    const payload: FormData = new FormData();
    if(data.is_geolocated === 'yes')
      payload.append('is_geolocated', "true");
    else
      payload.append('is_geolocated', "false");
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

    update(data : any){
      const payload: FormData = new FormData();
      data.hasOwnProperty('img') ? payload.append('img', data.img) : null;
      data.hasOwnProperty('img1') ? payload.append('img1', data.img1) : null;
      data.hasOwnProperty('img2') ? payload.append('img2', data.img2) : null;
      data.hasOwnProperty('img3') ? payload.append('img3', data.img3) : null;
      payload.append('id', data.id);
      payload.append('age', data.age);
      payload.append('biography', data.biography);
      payload.append('email', data.email);
      payload.append('firstName', data.firstName);
      payload.append('lastName', data.lastName);
      payload.append('gender', data.gender);
      payload.append('orientation', data.orientation);
      payload.append('lat', data.lat);
      payload.append('lng', data.lng);
      payload.append('interest', data.interest);

      payload.forEach((value, key) => {
        console.log("key %s: value %s", key, value);
        });
        this.http.post(`${updateUrl}`, payload)
    .subscribe(data => console.log(data))
    } 
  }
