import { MessageBackendService } from "./message-backend.service";
import { Message } from "./../models/message.model";
import { GeolocationService } from "./geolocation.service";
import { Injectable, OnDestroy } from "@angular/core";

import { Store } from "@ngrx/store";
import { AddMessageAction, ReinitializeMessagesAction } from "./actions";
import { AppState } from "app/app-state.model";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/first";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { NotificationService } from "app/notification/notification.service";
import { Subscription } from "rxjs/Subscription";

@Injectable()
export class MessageService implements OnDestroy {
  private position: Position;
  private subscription: Subscription;

  constructor(
    private _store: Store<AppState>,
    private _geolocationService: GeolocationService,
    private _messageBackendService: MessageBackendService,
    private _notificationService: NotificationService
  ) {
    this._notificationService.addNotification("Getting position");
    this.subscription = this._geolocationService.getCurrentPosition().subscribe(position => {
      this.position = position;
      this.synchronizeMessages();
    });
  }

  messages(): Observable<Message[]> {
    return this._store.select("messages");
  }

  synchronizeMessages(): void {
    if (this.position) {
      this._notificationService.addNotification("Loading messages");
      this.getMessages(this.position);
    }
  }

  addMessage(message: Message): void {
    if (this.position) {
      message.latitude = this.position.coords.latitude;
      message.longitude = this.position.coords.longitude;

      this._messageBackendService
        .saveMessage(message)
        .first()
        .subscribe(response => this.addMessageToStore(message), error => this.handleError(error));
    }
  }

  private getMessages(position: Position): void {
    this._messageBackendService
      .getMessages(position)
      .first()
      .subscribe(
        data => {
          this.reinitializeMessagesInStore(data);
          this._notificationService.addNotification("Done loading messages");
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
