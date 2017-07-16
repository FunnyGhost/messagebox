import { ActionReducer, Action } from '@ngrx/store';
import { ADD_MESSAGE } from './actions';

import { Message } from '../models/message.model';

export function messagesReducer(state: Message[] = [], action: Action) {
  switch (action.type) {
    case ADD_MESSAGE:
      return [...state, action.payload as Message];
    default:
      return state;
  }
}
