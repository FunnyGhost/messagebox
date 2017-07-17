import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMessageComponent } from './new-message.component';

import { Message } from '../models/message.model';
import { MessageService } from '../redux/message.service';

class FakeMessageService {
  addMessage(messageToAdd: Message) {

  }
}

describe('NewMessageComponent', () => {
  let component: NewMessageComponent;
  let fixture: ComponentFixture<NewMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewMessageComponent],
      providers: [{ provide: MessageService, useClass: FakeMessageService }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should add a new message', () => {
    const messageService: MessageService = TestBed.get(MessageService);
    const addSpy = spyOn(messageService, 'addMessage');

    const messageToAdd: Message = {
      text: 'Message to add'
    };
    component.addMessage(messageToAdd);
    expect(addSpy).toHaveBeenCalledWith(messageToAdd);
  })
});
