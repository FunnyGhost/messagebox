import { TestBed, inject } from '@angular/core/testing';

import { NotificationService } from './notification.service';
import { Observable } from 'rxjs/Observable';

describe('NotificationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotificationService]
    });
  });

  it('should be created', inject([NotificationService], (service: NotificationService) => {
    expect(service).toBeTruthy();
  }));

  it('should notify when there is a new notification', inject([NotificationService], (service: NotificationService) => {
    const notificationToSend = 'Some notification here';

    service.getNotifications()
      .subscribe(
      data => expect(data).toBe(notificationToSend)
      );

    service.addNotification(notificationToSend);
  }));
});
