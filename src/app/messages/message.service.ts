import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { ADD_MESSAGE } from './actions';
import { AppState } from './app-state.model';
import { Message } from './message.model';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class MessageService {
  constructor(
    private _store: Store<AppState>
  ) { }

  messages(): Observable<Message[]> {
    return this._store.select('messages');
  }

  addMessage(message: Message): void {
    this._store.dispatch({
      type: ADD_MESSAGE,
      payload: message
    });
  }
}
