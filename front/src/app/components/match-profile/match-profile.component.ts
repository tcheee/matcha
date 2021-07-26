import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

//ngrx imports
import { Store } from '@ngrx/store';
import { Observable, pipe } from 'rxjs';
import { first } from 'rxjs/operators';

// store imports
import {
  SelfSelectors,
  RootStoreState,
  UsersSelector,
  SelfAction,
} from '../../root-store';

// Service import 
import { socketService} from '../../services/socket-service.service';
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
  image1: any;
  image2: string;
  image3: string;
  likedyou : boolean = false;
  youlike : boolean = false;
  constructor(
    private _activatedRoute : ActivatedRoute,
    private store$: Store<RootStoreState.RootState>,
    private router: Router,
    private socketService : socketService,

  ) { }

  ngOnInit(): void {
    const id = this._activatedRoute.snapshot.paramMap.get('id');
    this.selfData$ = this.store$.select(SelfSelectors.getAllStateData);
    this.selfData$.pipe(first()).subscribe(res => {
      this.selfData = res;
      console.log(res);
    });
    this.usersData$ = this.store$.select(UsersSelector.getAllStateData);
    this.usersData$.pipe(first()).subscribe(res => {
      this.usersData = res.users
    })
    this.userData = this.usersData.filter(function(res : any) {
      return res.id == id;
    });
    this.likedyou = this.userData[0].mail === this.selfData.mail
    this.selfData.likes.forEach((likedmail : any) => {
      if (likedmail.target == this.userData[0].mail)
        this.youlike = true;
    })
    // API CALL FOR IMG
    // all-photos param email : ....
  //  this.image1 = this.userData[0].image1 != "data:image/jpeg;base64," ? this.userData[0].image1 : ""
 //   this.image2 = this.userData[0].image2 != "data:image/jpeg;base64," ? this.userData[0].image2 : ""
 //   this.image3 = this.userData[0].image3 != "data:image/jpeg;base64," ? this.userData[0].image3 : ""
    console.log(this.userData);
    // check if id user in in like self
    // check if id user is in match self
    // say that we visit profile of id 
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
  this.store$.dispatch(SelfAction.blockAction({from: this.selfData.mail, to: this.userData[0].mail}))
  this.socketService.sendMatchAction("block", this.selfData.mail, this.userData[0].mail)
  this.router.navigate(['/home/match'])
}



}
