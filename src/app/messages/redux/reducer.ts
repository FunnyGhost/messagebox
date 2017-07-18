import { ActionReducer, Action } from '@ngrx/store';
import { ADD_MESSAGE } from './actions';

import { Message } from '../models/message.model';

const initialState: Message[] = [{
  name: 'Catalin',
  text: 'This is an awesome message'
}, {
  name: 'Andra',
  text: 'I have an awesome phone'
}, {
  name: 'Pixie',
  text: 'All these fleas are killing me!'
}, {
  name: 'Koda',
  text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry'
}, {
  name: 'Valentin',
  text: 'What\'s happening here?'
}, {
  name: 'Valentin',
  text: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout'
}, {
  name: 'Valentin',
  text: 'What\'s happening here?'
}, {
  name: 'Valentin',
  text: 'What\'s happening here?'
}, {
  name: 'Valentin',
  text: 'What\'s happening here?'
}, {
  name: 'Valentin',
  text: 'What\'s happening here?'
}, {
  name: 'Valentin',
  text: 'What\'s happening here?'
}];

export function messagesReducer(state: Message[] = initialState, action: Action) {
  switch (action.type) {
    case ADD_MESSAGE:
      return [...state, action.payload as Message];
    default:
      return state;
  }
}
