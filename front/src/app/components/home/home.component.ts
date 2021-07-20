import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, pipe } from 'rxjs';
import { first } from 'rxjs/operators';

// store imports
import {
  SelfSelectors,
  RootStoreState,
  SelfAction
} from '../../root-store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  isExpanded: boolean = false;
  notificationsUnseen : any;
  constructor(
    private router: Router,
    private store$: Store<RootStoreState.RootState>
    ) { }

  ngOnInit(): void {
    this.store$.select(SelfSelectors.notificationsUnseen).subscribe(
      res => this.notificationsUnseen = parseInt(res)
    )
  }

  removeNotifications(){
    this.store$.dispatch(SelfAction.removeUnseenNotifications());
  }
  logout(){
    this.router.navigate(["/"]);
  }
}
