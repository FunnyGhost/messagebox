import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { messagesReducer } from './/messages/redux/reducer';
import { MessageService } from './messages/redux/message.service';
import { MessagesComponent } from './messages/messages.component';
import { MessageItemComponent } from './messages/message-item/message-item.component';
import { NewMessageComponent } from './messages/new-message/new-message.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    MessagesComponent,
    MessageItemComponent,
    NewMessageComponent,
    HomeComponent,
    AboutComponent
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
