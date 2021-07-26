import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

import { Component, OnInit, ViewChildren, ViewChild, AfterViewInit, QueryList, ElementRef, HostListener } from '@angular/core';
import { Location } from '@angular/common';
import { MatList, MatListItem } from '@angular/material/list';
import { Router, ActivatedRoute } from '@angular/router';
import { socketService} from '../../services/socket-service.service'
import { AuthServiceService } from '../../services/auth-service.service'

// store imports
import {
  SelfSelectors,
  RootStoreState,
} from '../../root-store';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit {
  messages: any[] = [];
  email: string = ''!;
  to: string = ''!;
  room: string = ''!;
  username: string = ''!;
  messageContent: string = ''!;
  ioConnection: any;
  storedUserName: string;

  @ViewChild(MatList, { read: ElementRef, static: true }) matList: ElementRef;
  @ViewChildren(MatListItem, { read: ElementRef }) matListItems: QueryList<MatListItem>;

  constructor(
    private socketService: socketService,
    private route: ActivatedRoute,
    private service : AuthServiceService,
    private store$: Store<RootStoreState.RootState>
  ) {}

  public joinRoom(room:string): void {
    if (!room) {
      return
    }

    this.socketService.joinRoom(room);
  }

  ngOnInit(): void {  
    //Get the mail of the person with whom we are going to discuss and the mail of the current user
    this.to = history.state.to
    this.store$.select(SelfSelectors.getAllStateData).pipe(first()).subscribe(
      res => {
        this.email = res.mail
      }
      );


    //Join the right room to discuss with the person
    this.room = this.route.snapshot.url[1].path || '';
    this.joinRoom(this.room)

    //Get all the history of messages with this specific room
    this.service.getMessagesHistory(this.room)
    .subscribe((data: any) => {
      console.log(data)
      this.messages = data
    });

    //Put all the message to seen = true
    this.service.removeMessage(this.email, false)
    
    //Add message to the list when received via the Socket
    this.socketService.onChat()
      .subscribe((message: any) => {
        this.messages.push(message);
      });
  }

  ngAfterViewInit(): void {
    // subscribing to any changes in the list of items / messages
    this.matListItems.changes.subscribe(elements => {
      this.scrollToBottom();
    });
  }

  ngOnDestroy(): void {
    //Leave the room when the user is leaving the chat 
    this.socketService.leaveRoom(this.room);
  }

  private scrollToBottom(): void {
    try {
      this.matList.nativeElement.scrollTop = this.matList.nativeElement.scrollHeight;
    } catch (err) {
    }
  }

  public sendMessage(message: string): void {
    if (!message) {
      return;
    }

    this.socketService.sendChat(
      this.email,
      this.to,
      message,
      this.room
    );

    this.messageContent = '';
  }
}
