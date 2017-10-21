import { MessageBackendService } from "./messages/redux/message-backend.service";
import { GeolocationService } from "./messages/redux/geolocation.service";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { ReactiveFormsModule } from "@angular/forms";
import { NgxErrorsModule } from "@ultimate/ngxerrors";
import { HttpClientModule } from "@angular/common/http";
import { AlertModule } from "ngx-bootstrap/alert";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { NotificationService } from "app/notification/notification.service";

import { messagesReducer } from ".//messages/redux/reducer";
import { MessageService } from "./messages/redux/message.service";
import { MessagesComponent } from "./messages/messages.component";
import { MessageItemComponent } from "./messages/message-item/message-item.component";
import { NewMessageComponent } from "./messages/new-message/new-message.component";
import { HomeComponent } from "./home/home.component";
import { AboutComponent } from "./about/about.component";

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
    AlertModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxErrorsModule,
    HttpClientModule,
    StoreModule.forRoot({ messages: messagesReducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 25 //  Retains last 25 states
    })
  ],
  providers: [MessageService, GeolocationService, MessageBackendService, NotificationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
