import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Component, OnInit, ViewChildren, ViewChild, AfterViewInit, QueryList, ElementRef } from '@angular/core';
import { MatList, MatListItem } from '@angular/material/list';
import { AuthServiceService } from '../../services/auth-service.service'
import { Router } from '@angular/router';

// store imports
import {
  SelfSelectors,
  RootStoreState,
} from '../../root-store';

@Component({
  selector: 'chat-history',
  templateUrl: './availableChat.component.html',
  styleUrls: ['./availableChat.component.scss']
})

export class ChatComponent implements OnInit {
  messages: any[] = [];

  @ViewChild(MatList, { read: ElementRef, static: true }) matList: ElementRef;
  @ViewChildren(MatListItem, { read: ElementRef }) matListItems: QueryList<MatListItem>;

  constructor(
    private router : Router,
    private service : AuthServiceService,
    private store$: Store<RootStoreState.RootState>,
  ) {}

  ngOnInit(): void {
    this.store$.select(SelfSelectors.getAllStateData).pipe(first()).subscribe(
      res => {
        this.email = res.mail
      });


    this.service.getOrderMessages(this.email)
      .subscribe((data: object) => {
        console.log(data)
      });
  }

  ngAfterViewInit(): void {
    // subscribing to any changes in the list of items / messages
  }
}
