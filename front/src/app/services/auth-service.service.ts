import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { baseUrl, resetPasswordUrl, registerUrl, changePasswordUrl, updateUrl, imageUrl, orderMessageUrl, messageHistoryUrl, resetNotifUrl, resetMessagefUrl, blockUrl, activateUrl} from 'src/environments/environment';
import {MatSnackBar} from '@angular/material/snack-bar';
// ngrx imports
import { Store, } from '@ngrx/store';
// store imports
import { RootStoreState, SelfAction, UsersAction} from '../root-store';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(
    private http: HttpClient,
    private store$: Store<RootStoreState.RootState>,
    private _snackBar: MatSnackBar,
    private router : Router,
//    private handler : HttpBackend,
    ) { }

  login(data : any) :Observable<any>{
    return this.http.post(`${baseUrl}`, data, {withCredentials: true});
  }

  getOrderMessages(data : any) :Observable<any>{
    return this.http.get(`${orderMessageUrl}`, {withCredentials: true, params: {email: data}});
  }

  getMessagesHistory(data : any) :Observable<any>{
    return this.http.get(`${messageHistoryUrl}`, {withCredentials: true, params: {room: data}});
  }

  resetPassword(data : any) {
    return this.http.post(`${resetPasswordUrl}`, data).subscribe(data => data)
  }

  changePassword(data : any) {
    return this.http.post(`${changePasswordUrl}`, data).subscribe((data : any) => {
      if (data.success === true){
          this._snackBar.open("Password successfuly change", undefined, {duration : 1500 }),
          this.router.navigate(["/home/welcome"])
      }
      else 
      { 
          this._snackBar.open("something bad happened",  undefined, {duration : 1500 })
      }
    })
  }

  activateUser(data : any) {
    return this.http.post(`${activateUrl}`, data).subscribe((data : any) => {
      if (data.success === true){
          this._snackBar.open("Account activated", undefined, {duration : 1500 }),
          this.router.navigate(["/"])
      }
      else 
      { 
          this._snackBar.open("Activation did not work",  undefined, {duration : 1500 })
          this.router.navigate(["/"])
      }
    })
  }

  removeNotification(mail : string){
    return this.http.post(`${resetNotifUrl}`,{mail : mail}).subscribe((data : any) => {
       if (data.success === true){
        this.store$.dispatch(SelfAction.removeUnseenNotifications());
        this.router.navigate(['/home/history'])
       }
       else {
        this._snackBar.open("Something bad Happened", undefined, {duration : 1500 })
       }
       
    })
  }
  getImages(data : string) {
    return this.http.get(`${imageUrl}`, {params: {mail : data}});
  }

  removeMessage(mail : string, isRedirect : boolean){
    return this.http.post(`${resetMessagefUrl}`,{mail : mail}).subscribe((data : any)=> {
      if (data.success === true){
        this.store$.dispatch(SelfAction.removeUnseenMessages());
        if (isRedirect)
          this.router.navigate(['/home/chat'])
      }
      else {
        this._snackBar.open("Something bad Happened", undefined, {duration : 1500 })
       }
       
    })
    }
    blockUser(from : string, to : string){
      return this.http.post(`${blockUrl}`, {from : from , to: to}).subscribe((data : any)  => {
        this.store$.dispatch(SelfAction.blockAction({blocks : data.blocked_users}))
      })
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


   // this.http = new HttpClient(this.handler);
    this.http.post(`${registerUrl}`, payload)
    .subscribe(data => {
      this._snackBar.open("You are successfully created", undefined, {duration : 1500 })
      this.router.navigate(['/'])
      },
      (error) => { 
        // error() method block
        if (error)
        this._snackBar.open(error.error.message, undefined, {duration : 1500 })
      }
    )
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

    this.http.post(`${updateUrl}`, payload)
    .subscribe(data => {
      this._snackBar.open("You are successfully Updated", undefined, {duration : 1500 })
      this.router.navigate(['/home/welcome'])
      this.store$.dispatch(SelfAction.updateSelf({user : data['data']['user'], images : data['data']['images']}));
      }  ) 
  }
}
