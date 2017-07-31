import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class NotificationService {

  notifications: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor() { }

  addNotification(notificationToAdd: string): void {
    this.notifications.next(notificationToAdd);
  }

  getNotifications(): Observable<string> {
    return this.notifications.asObservable().filter(data => data !== '');
  }

}
