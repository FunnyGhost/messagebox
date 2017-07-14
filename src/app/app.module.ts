import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { StoreModule } from '@ngrx/store';
import { messagesReducer } from './messages/reducer';

import { MessageService } from './messages/message.service';

@NgModule({
  declarations: [
    AppComponent
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
