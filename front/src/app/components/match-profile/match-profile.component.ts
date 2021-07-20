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
  selfData : any;
  usersData$ : Observable<any>;
  usersData : any;
  userData : any;
  id : any;
  constructor(
    private _activatedRoute : ActivatedRoute,
    private store$: Store<RootStoreState.RootState>,

  ) { }

  ngOnInit(): void {
    const id = this._activatedRoute.snapshot.paramMap.get('id');
    this.selfData$ = this.store$.select(SelfSelectors.getAllStateData);
    this.selfData$.pipe(first()).subscribe(res => this.selfData = res);
    this.usersData$ = this.store$.select(UsersSelector.getAllStateData);
    this.usersData$.pipe(first()).subscribe(res => {
      this.usersData = res.users
    })
    this.userData = this.usersData.filter(function(res : any) {
      return res.id == id;
    });
    console.log(this.userData);
  }

}
