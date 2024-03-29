import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

//ngrx imports
import { Store } from '@ngrx/store';
import { Observable, pipe } from 'rxjs';
import { first } from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';

// store imports
import {
  SelfSelectors,
  RootStoreState,
  UsersSelector,
  SelfAction,
} from '../../root-store';

// Service import 
import { socketService} from '../../services/socket-service.service';
import { AuthServiceService} from '../../services/auth-service.service';
@Component({
  selector: 'app-match-profile',
  templateUrl: './match-profile.component.html',
  styleUrls: ['./match-profile.component.scss']
})
export class MatchProfileComponent implements OnInit {

  selfData$ : Observable<any>;
  selfData : any;
  isliked : boolean;
  usersData$ : Observable<any>;
  usersData : any;
  userData : any;
  id : any;
  image : string = "";
  image1: string = "";
  image2: string = "";
  image3: string = "";
  likedyou : boolean = false;
  youlike : boolean = false;
  isOnline : boolean = false;
  isMatch : boolean = false;
  routeRoom : string = "";
  constructor(
    private _activatedRoute : ActivatedRoute,
    private store$: Store<RootStoreState.RootState>,
    private router: Router,
    private socketService : socketService,
    private authservice : AuthServiceService,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    const id = this._activatedRoute.snapshot.paramMap.get('id');
    this.selfData$ = this.store$.select(SelfSelectors.getAllStateData);
    this.usersData$ = this.store$.select(UsersSelector.getAllUsersStateData);
    this.usersData$.subscribe(res => {
      this.isOnline = false
      this.usersData = res.users
      this.userData = this.usersData.filter(function(res : any) {
      return res.id == id;
    });
    this.isOnline = this.userData[0].is_online
  });
    this.selfData$.subscribe(res => {
      this.selfData = res;
      this.likedyou = this.userData[0].mail === this.selfData.mail
      this.selfData.likes.lenght ? undefined : this.youlike = false;
      this.selfData.likes.forEach((likedmail : any) => {
      if (likedmail.target == this.userData[0].mail)
        this.youlike = true;
    })
      this.selfData.matches.lenght ? undefined : this.isMatch = false;
      this.selfData.matches.forEach((matches : any) => {
        if (matches.target === this.userData[0].mail){
          this.isMatch = true;
          this.routeRoom = matches.room;
        }
    });
  }),
    
    this.authservice.getImages(this.userData[0].mail).subscribe(
      (result : any) => {
        this.image = result.hasOwnProperty("image0") ? "data:image/jpeg;base64," + result.image0 : "";
        this.image1 = result.hasOwnProperty("image1") ? "data:image/jpeg;base64," + result.image1 : "";
        this.image2 = result.hasOwnProperty("image2") ? "data:image/jpeg;base64," + result.image2 : "";
        this.image3 = result.hasOwnProperty("image3") ? "data:image/jpeg;base64," + result.image3 : "";
      }
    )
    this.store$.dispatch(SelfAction.VisitAction({from : this.selfData.mail, to: this.userData[0].mail}))
    this.socketService.sendMatchAction("visit", this.selfData.mail, this.userData[0].mail)
  }
//// ACTION
likeAction(){
  this.store$.dispatch(SelfAction.likeAction({from: this.selfData.mail, to: this.userData[0].mail})),
  this.socketService.sendMatchAction("like", this.selfData.mail, this.userData[0].mail)
}

unlikeAction(){
  this.store$.dispatch(SelfAction.unLikeAction({from: this.selfData.mail, to: this.userData[0].mail}))
  this.socketService.sendMatchAction("unlike", this.selfData.mail, this.userData[0].mail)
}

blockAction(){
  this.authservice.blockUser(this.selfData.mail, this.userData[0].mail)
  this._snackBar.open("You have successfully block " + this.userData[0].first_name + this.userData[0].last_name,  undefined, {duration : 1500 })
  this.router.navigate(['/home/welcome'])
}

routeToChat(){
  this.router.navigate(['/home/chat/' + this.routeRoom], {state: {to: this.userData[0].mail}})
}

}
