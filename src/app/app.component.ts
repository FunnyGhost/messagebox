import { MessageService } from "./messages/redux/message.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { NotificationService } from "app/notification/notification.service";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.sass"]
})
export class AppComponent implements OnInit, OnDestroy {
  notifications: string[] = [];
  private subscription: Subscription;

  constructor(
    private _notificationService: NotificationService,
    private _messageService: MessageService
  ) {}

  ngOnInit() {
    this._messageService.synchronizeMessages();

    this.subscription = this._notificationService
      .getNotifications()
      .subscribe(data => this.notifications.push(data));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
