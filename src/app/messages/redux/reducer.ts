import { Message } from "./../models/message.model";
import { Action } from "@ngrx/store";
import { ADD_MESSAGE, AddMessageAction, REINITIALIZE_MESSAGES, ReinitializeMessagesAction } from "./actions";

const initialState: Message[] = [];

export function messagesReducer(state: Message[] = initialState, action: AddMessageAction | ReinitializeMessagesAction): Message[] {
  switch (action.type) {
    case ADD_MESSAGE: {
      return [...state, action.payload as Message];
    }
    case REINITIALIZE_MESSAGES: {
      return action.payload;
    }
    default:
      return state;
  }
}
