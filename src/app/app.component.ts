import { Component, OnInit } from '@angular/core';

import { MessageService } from './messages/message.service';
import { Message } from './messages/message.model';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

  messages: Observable<Message[]>;

  constructor(
    private _messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.messages = this._messageService.messages();
  }

  addMessage(): void {
    const messageToAdd: Message = new Message();
    messageToAdd.text = 'Message displayed here';
    this._messageService.addMessage(messageToAdd);
  }
}
