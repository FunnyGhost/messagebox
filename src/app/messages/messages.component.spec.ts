import { MessageItemComponent } from './message-item/message-item.component';
import { async, ComponentFixture, TestBed, fakeAsync, flushMicrotasks } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { MessageService } from './redux/message.service';
import { Message } from './models/message.model';

import { MessagesComponent } from './messages.component';

describe('MessagesComponent', () => {
  let component: MessagesComponent;
  let fixture: ComponentFixture<MessagesComponent>;

  class FakeMessageService {
    messages(): Observable<Message[]> {
      const message1: Message = new Message();
      message1.content = 'Message 1 text';
      const message2: Message = new Message();
      message2.content = 'Message 2 text';

      return Observable.of([message1, message2]);
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MessagesComponent, MessageItemComponent],
      providers: [{ provide: MessageService, useClass: FakeMessageService }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should show all the messages', fakeAsync(() => {
    flushMicrotasks();

    const el: DebugElement = fixture.debugElement;
    const numberOfMessages = el.queryAll(By.css('.message-item'));
    expect(numberOfMessages.length).toBe(2);
  }));
});
