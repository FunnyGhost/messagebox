import { Message } from "./../models/message.model";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { MessageService } from "../redux/message.service";

@Component({
  selector: "app-new-message",
  templateUrl: "./new-message.component.html",
  styleUrls: ["./new-message.component.sass"]
})
export class NewMessageComponent implements OnInit {

  message: FormGroup;

  constructor(
    private _router: Router,
    private _messageService: MessageService,
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.message = this._formBuilder.group({
      title: ["", [Validators.required, Validators.minLength(5)]],
      content: ["", [Validators.required, Validators.minLength(10)]],
      name: ["", [Validators.required, Validators.minLength(4)]],
      phone: ["", [Validators.required, Validators.minLength(7)]],
      agreeWithPrivacyPolicy: ["", []],
    });
  }

  addMessage(): void {
    const messageToAdd: Message = this.message.value;
    this._messageService.addMessage(messageToAdd);
    this._router.navigate(["/messages"]);
  }

}
