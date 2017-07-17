import { Action } from '@ngrx/store';

import { messagesReducer } from './reducer';
import { ADD_MESSAGE } from './actions';

import { Message } from '../models/message.model';

describe('The message reducer', () => {

  const inexistentAction: Action = {
    type: 'INEXISTENT_ACTION'
  };

  it('should initialize the list of messages', () => {
    const messages = messagesReducer(undefined, inexistentAction);
    expect(messages.length).toBe(0);
  });

  it('should return the previous state if the action is invalid', () => {
    const previousState: Message[] = []
    const message1: Message = new Message();
    message1.text = 'Some text here';

    previousState.push(message1);

    const nextState = messagesReducer(previousState, inexistentAction);
    expect(nextState).toBe(previousState);
  });

  it('should add new message', () => {
    const messageToAdd: Message = new Message();
    messageToAdd.text = 'This is a new message';

    const action: Action = {
      type: ADD_MESSAGE,
      payload: messageToAdd
    };

    const nextState: Message[] = messagesReducer(undefined, action);
    expect(nextState.length).toBe(1);
    expect(nextState[0]).toBe(messageToAdd);
  })
})
