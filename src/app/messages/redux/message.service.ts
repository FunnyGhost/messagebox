import { MessageBackendService } from "./message-backend.service";
import { Message } from "./../models/message.model";
import { GeolocationService } from "./geolocation.service";
import { Injectable } from "@angular/core";

import { Store } from "@ngrx/store";
import { AddMessageAction, ReinitializeMessagesAction } from "./actions";
import { AppState } from "app/app-state.model";

import { Observable } from "rxjs/Observable";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { NotificationService } from "app/notification/notification.service";

@Injectable()
export class MessageService {
  private currentPosition$: Observable<Position>;

  constructor(
    private _store: Store<AppState>,
    private _geolocationService: GeolocationService,
    private _messageBackendService: MessageBackendService,
    private _notificationService: NotificationService
  ) {
    this.currentPosition$ = this._geolocationService.getCurrentPosition();
  }

  messages(): Observable<Message[]> {
    return this._store.select("messages");
  }

  synchronizeMessages(): void {
    this._notificationService.addNotification("Loading messages");
    this.currentPosition$.subscribe(position => {
      this.getMessages(position);
    });
  }

  addMessage(message: Message): void {
    this.currentPosition$.subscribe(position => {
      message.latitude = position.coords.latitude;
      message.longitude = position.coords.longitude;

      this._messageBackendService
        .saveMessage(message)
        .subscribe(response => this.addMessageToStore(message), error => this.handleError(error));
    });
  }

  private getMessages(position: Position): void {
    this._messageBackendService.getMessages(position).subscribe(
      data => {
        this.reinitializeMessagesInStore(data);
        this._notificationService.addNotification("Done");
      },
      error => this.handleError(error)
    );
  }

  private handleError(error: Response | PositionError) {
    if (error instanceof PositionError) {
      this._notificationService.addNotification(error.message);
    } else {
      this._notificationService.addNotification(error.statusText);
    }
    console.log(error);
  }

  private reinitializeMessagesInStore(messages: Message[]): void {
    this._store.dispatch(new ReinitializeMessagesAction(messages));
  }

  private addMessageToStore(message: Message): void {
    this._store.dispatch(new AddMessageAction(message));
  }
}
