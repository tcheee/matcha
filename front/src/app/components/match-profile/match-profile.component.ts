import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

//ngrx imports
import { Store } from '@ngrx/store';
import { Observable, pipe } from 'rxjs';
import { first } from 'rxjs/operators';

// store imports
import {
  SelfSelectors,
  RootStoreState,
  UsersSelector,
} from '../../root-store';
@Component({
  selector: 'app-match-profile',
  templateUrl: './match-profile.component.html',
  styleUrls: ['./match-profile.component.scss']
})
export class MatchProfileComponent implements OnInit {

  selfData$ : Observable<any>;
  isliked : boolean;
  usersData$ : Observable<any>;
  usersData : any;
  userData : any;
  id : any;
  image1: any;
  image2: string;
  image3: string;
  constructor(
    private _activatedRoute : ActivatedRoute,
    private store$: Store<RootStoreState.RootState>,

  ) { }

  ngOnInit(): void {
    const id = this._activatedRoute.snapshot.paramMap.get('id');
    this.selfData$ = this.store$.select(SelfSelectors.getAllStateData);
    this.selfData$.pipe(first()).subscribe(res => {
      console.log(res);
    });
    this.usersData$ = this.store$.select(UsersSelector.getAllStateData);
    this.usersData$.pipe(first()).subscribe(res => {
      this.usersData = res.users
    })
    this.userData = this.usersData.filter(function(res : any) {
      return res.id == id;
    });
    // API CALL FOR IMG
  //  this.image1 = this.userData[0].image1 != "data:image/jpeg;base64," ? this.userData[0].image1 : ""
 //   this.image2 = this.userData[0].image2 != "data:image/jpeg;base64," ? this.userData[0].image2 : ""
 //   this.image3 = this.userData[0].image3 != "data:image/jpeg;base64," ? this.userData[0].image3 : ""
    console.log(this.userData);
    // check if id user in in like self
    // check if id user is in match self
    // say that we visit profile of id 
  }

}
