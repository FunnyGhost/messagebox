import { Action } from "@ngrx/store";

import { messagesReducer } from "./reducer";
import { ADD_MESSAGE, AddMessageAction, ReinitializeMessagesAction } from "./actions";

import { Message } from "../models/message.model";

describe("The message reducer", () => {

  it("should add new message", () => {
    const messageToAdd: Message = new Message();
    messageToAdd.content = "This is a new message";

    const action: AddMessageAction = new AddMessageAction(messageToAdd);

    const nextState = messagesReducer([], action);
    expect(nextState.length).toBe(1);
    expect(nextState[0]).toBe(messageToAdd);
  });

  it("should reinitialize the list of messages", () => {
    const message1: Message = new Message;
    message1.content = "Message 1 content";

    const message2: Message = new Message();
    message2.content = "Message 2 content";

    const action = new ReinitializeMessagesAction([message1, message2]);

    const nextState = messagesReducer([], action);
    expect(nextState.length).toBe(2);
    expect(nextState[0]).toBe(message1);
    expect(nextState[1]).toBe(message2);
  });
});
