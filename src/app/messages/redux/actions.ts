import { Message } from './../models/message.model';
import { Action } from '@ngrx/store';

export const ADD_MESSAGE = 'ADD_MESSAGE';
export const REINITIALIZE_MESSAGES = 'REINITIALIZE_MESSAGES';

export class AddMessageAction implements Action {
  readonly type = ADD_MESSAGE;

  constructor(public payload: Message) {

  }
}

export class ReinitializeMessagesAction implements Action {
  readonly type = REINITIALIZE_MESSAGES;

  constructor(public payload: Message[]) {

  }
}
