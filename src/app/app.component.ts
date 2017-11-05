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
  private notificationSubscription: Subscription;

  constructor(private _notificationService: NotificationService) {}

  ngOnInit() {
    this.notificationSubscription = this._notificationService
      .getNotifications()
      .subscribe(data => this.notifications.push(data));
  }

  ngOnDestroy() {
    this.notificationSubscription.unsubscribe();
  }
}
