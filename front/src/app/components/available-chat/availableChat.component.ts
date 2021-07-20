import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

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
  styleUrls: ['./availableChat.component.css']
})

export class availableChatComponent implements OnInit {
  email: string = "";
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
      }
      );


    this.service.getOrderMessages(this.email)
      .subscribe((data: any) => {
        this.messages = data
        console.log(data);
        // for (elem in data) {
        //   console.log(elem)
        // }
      });
  }

  ngAfterViewInit(): void {
    // subscribing to any changes in the list of items / messages
  }
}
