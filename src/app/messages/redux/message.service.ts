import { Message } from './../models/message.model';
import { GeolocationService } from './geolocation.service';
import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { AddMessageAction, ReinitializeMessagesAction } from './actions';
import { AppState } from 'app/app-state.model';

import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class MessageService {

  private _messageBoxUrl = 'https://messagebox.io/api/MessageBox';
  private _authorizationHeader = 'Basic VmFsaWRVc2VyOlZhbGlkUGFzc3dvcmQ=';

  constructor(
    private _store: Store<AppState>,
    private _geolocationService: GeolocationService,
    private _http: HttpClient
  ) { }

  messages(): Observable<Message[]> {
    this._geolocationService.getCurrentPosition()
      .subscribe(position => {
        this.getMessages(position);
      });

    return this._store.select('messages');
  }

  addMessage(message: Message): void {
    this._store.dispatch(new AddMessageAction(message));
  }

  reinitializeMessages(messages: Message[]): void {
    this._store.dispatch(new ReinitializeMessagesAction(messages));
  }

  private getMessages(position: Position): void {
    const url: string = this._messageBoxUrl + `?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}`;

    this._http.get<Message[]>(url, { headers: new HttpHeaders().set('Authorization', this._authorizationHeader) })
      .subscribe(data => this.reinitializeMessages(data));
  }

  private handleError(error: Response) {
    console.log(error);
  }
}
