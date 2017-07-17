import { Component, OnInit } from '@angular/core';

import { Message } from '../models/message.model';
import { MessageService } from '../redux/message.service';

@Component({
  selector: 'app-new-message',
  templateUrl: './new-message.component.html',
  styleUrls: ['./new-message.component.sass']
})
export class NewMessageComponent implements OnInit {

  constructor(
    private _messageService: MessageService
  ) { }

  ngOnInit() {
  }

  addMessage(messageToAdd: Message): void {
    this._messageService.addMessage(messageToAdd);
  }

}
