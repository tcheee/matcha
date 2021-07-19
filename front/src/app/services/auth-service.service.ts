import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { baseUrl, resetPasswordUrl, registerUrl, changePasswordUrl} from 'src/environments/environment';

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
  }
