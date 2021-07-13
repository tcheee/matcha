import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthServiceService} from '../../services/auth-service.service'
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})

export class ChatComponent implements OnInit {
  public uuid: string = ''!;

  constructor(
    private router : Router,
    private authservice : AuthServiceService,
    private route: ActivatedRoute,
    private socket : Socket
  ) {}

  ngOnInit() {
    this.uuid = this.route.snapshot.queryParamMap.get('uuid') || '';
  }

  onSubmit() {

  };
  
  this.socket.on('chat', (data) => {
    console.log(data);
  })

}
