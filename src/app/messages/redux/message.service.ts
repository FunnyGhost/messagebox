import { MessageBackendService } from './message-backend.service';
import { Message } from './../models/message.model';
import { GeolocationService } from './geolocation.service';
import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { AddMessageAction, ReinitializeMessagesAction } from './actions';
import { AppState } from 'app/app-state.model';

import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NotificationService } from 'app/notification/notification.service';

@Injectable()
export class MessageService {

  constructor(
    private _store: Store<AppState>,
    private _geolocationService: GeolocationService,
    private _messageBackendService: MessageBackendService,
    private _notificationService: NotificationService
  ) { }

  messages(): Observable<Message[]> {
    this._geolocationService.getCurrentPosition()
      .subscribe(
      position => {
        this.getMessages(position);
      },
      error => this.handleError(error));

    return this._store.select('messages');
  }

  addMessage(message: Message): void {
    this._geolocationService.getCurrentPosition()
      .subscribe(position => {
        message.latitude = position.coords.latitude;
        message.longitude = position.coords.longitude;

        this._messageBackendService.saveMessage(message)
          .subscribe(
          response => this.addMessageToStore(message),
          error => this.handleError(error)
          );
      });
  }

  private getMessages(position: Position): void {
    this._messageBackendService.getMessages(position)
      .subscribe(
      data => this.reinitializeMessagesInStore(data),
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
