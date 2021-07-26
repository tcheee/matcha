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
    private authservice : AuthServiceService,
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
    this.authservice.getImages(this.userData[0].mail).subscribe(
      result => console.log(result)
    )
    this.store$.dispatch(SelfAction.VisitAction({from : this.selfData.mail, to: this.userData[0].mail}))
    this.socketService.sendMatchAction("visit", this.selfData.mail, this.userData[0].mail)
    console.log(this.userData);
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
