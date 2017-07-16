import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { messagesReducer } from './/messages/redux/reducer';
import { MessageService } from './messages/redux/message.service';
import { MessagesComponent } from './messages/messages.component';
import { MessageItemComponent } from './messages/message-item/message-item.component';

@NgModule({
  declarations: [
    AppComponent,
    MessagesComponent,
    MessageItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.provideStore({ messages: messagesReducer })
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
