import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { FormGroup } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { NgxErrorsModule } from "@ultimate/ngxerrors";
import { NewMessageComponent } from "./new-message.component";

import { Message } from "../models/message.model";
import { MessageService } from "../redux/message.service";

class FakeMessageService {
  addMessage(messageToAdd: Message) {

  }
}

class FakeRouter {
  navigate() {

  }
}

describe("NewMessageComponent", () => {
  let component: NewMessageComponent;
  let fixture: ComponentFixture<NewMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, NgxErrorsModule],
      declarations: [NewMessageComponent],
      providers: [
        { provide: MessageService, useClass: FakeMessageService },
        { provide: Router, useClass: FakeRouter },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should be created", () => {
    expect(component).toBeTruthy();
  });

  it("should add a new message", () => {
    const messageService: MessageService = TestBed.get(MessageService);
    const addSpy = spyOn(messageService, "addMessage");

    const messageToAdd: Message = new Message();
    messageToAdd.name = "Catalin";
    messageToAdd.content = "Message to add";

    component.message.controls["name"].setValue(messageToAdd.name);
    component.message.controls["content"].setValue(messageToAdd.content);

    component.addMessage();
    expect(addSpy).toHaveBeenCalledWith(component.message.value);
  });
});
