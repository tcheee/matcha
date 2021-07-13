import { Component, OnInit, ViewChildren, ViewChild, AfterViewInit, QueryList, ElementRef } from '@angular/core';
import { MatList, MatListItem } from '@angular/material/list';
import { socketService} from '../../services/socket-service.service'

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit {
  messages: any[] = [];
  room: string = ''!;
  username: string = ''!;
  messageContent: string = ''!;
  ioConnection: any;
  storedUserName: string;

  @ViewChild(MatList, { read: ElementRef, static: true }) matList: ElementRef;
  @ViewChildren(MatListItem, { read: ElementRef }) matListItems: QueryList<MatListItem>;

  constructor(
    private socketService: socketService
  ) {}

  ngOnInit(): void {
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

  private scrollToBottom(): void {
    try {
      this.matList.nativeElement.scrollTop = this.matList.nativeElement.scrollHeight;
    } catch (err) {
    }
  }

  public joinRoom(room:string): void {
    if (!room) {
      return
    }

    this.socketService.joinRoom(room);
  }

  public sendMessage(message: string): void {
    if (!message) {
      return;
    }

    this.socketService.sendChat(
      this.username,
      'other guy',
      message,
      this.room
    );

    this.messageContent = '';
  }



  onSubmit() {

  };
}
