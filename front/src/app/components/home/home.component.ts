import { ThrowStmt } from '@angular/compiler';
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

// service import
import { AuthServiceService } from '../../services/auth-service.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  isExpanded: boolean = false;
  notificationsUnseen : any;
  messagesUnseen: any;
  constructor(
    private router: Router,
    private store$: Store<RootStoreState.RootState>,
    private authservice : AuthServiceService,
    ) { }

  ngOnInit(): void {
    this.store$.select(SelfSelectors.notificationsUnseen).subscribe(
      res => this.notificationsUnseen = parseInt(res)
    )
    this.store$.select(SelfSelectors.messagesUnseen).subscribe(
      res => this.messagesUnseen = parseInt(res)
    )
    this.router.navigate(['home/welcome'])
  }

  removeNotifications(){
    this.store$.select(SelfSelectors.mail).pipe(first()).subscribe(
      res => 
      this.authservice.removeNotification(res));
  }
  removeMessages(){
    this.store$.select(SelfSelectors.mail).pipe(first()).subscribe(
      res =>
      this.authservice.removeMessage(res, true));
  }
  home(){
    this.router.navigate(["home/welcome"])
  }
  logout(){
    this.router.navigate(["/"]);
  }
}
