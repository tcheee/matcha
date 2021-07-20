import { Component, OnInit, ViewChildren, ViewChild, AfterViewInit, QueryList, ElementRef } from '@angular/core';
import { MatList, MatListItem } from '@angular/material/list';
import { AuthServiceService } from '../../services/auth-service.service'

@Component({
  selector: 'chat-history',
  templateUrl: './availableChat.component.html',
  styleUrls: ['./availableChat.component.scss']
})

export class ChatComponent implements OnInit {
  messages: any[] = [];
  room: string = ''!;
  username: string = ''!;

  @ViewChild(MatList, { read: ElementRef, static: true }) matList: ElementRef;
  @ViewChildren(MatListItem, { read: ElementRef }) matListItems: QueryList<MatListItem>;

  constructor(
    private service : AuthServiceService,
  ) {}

  ngOnInit(): void {
    this.service.getOrderMessages(mail)
      .subscribe((data: object) => {
        console.log(data)
      });
  }

  ngAfterViewInit(): void {
    // subscribing to any changes in the list of items / messages
  }
}
