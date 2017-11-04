import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs/Observable";

import { Message } from "./models/message.model";
import { MessageService } from "./redux/message.service";

@Component({
  selector: "app-messages",
  templateUrl: "./messages.component.html",
  styleUrls: ["./messages.component.sass"]
})
export class MessagesComponent implements OnInit {
  messages: Observable<Message[]>;

  // Issue with linting
  public async: any;

  constructor(private _messagesService: MessageService) {}

  ngOnInit() {
    this.messages = this._messagesService.messages();
  }

  refresh(): void {
    this._messagesService.synchronizeMessages();
  }
}
