import { Message } from "./../models/message.model";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { DebugElement } from "@angular/core";

import { MessageItemComponent } from "./message-item.component";

describe("MessageItemComponent", () => {

  const messageText = "This is the text of the message";
  const messageName = "Catalin";
  const messageToShow = new Message;
  messageToShow.content = messageText;
  messageToShow.name = messageName;

  let component: MessageItemComponent;
  let fixture: ComponentFixture<MessageItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MessageItemComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageItemComponent);
    component = fixture.componentInstance;
    component.message = messageToShow;
    fixture.detectChanges();
  });

  it("should be created", () => {
    expect(component).toBeTruthy();
  });

  it("should show the message details", () => {
    const el: HTMLElement = fixture.debugElement.nativeElement;
    expect(el.innerHTML).toContain(messageText);
    expect(el.innerHTML).toContain(messageName);
  });
});
