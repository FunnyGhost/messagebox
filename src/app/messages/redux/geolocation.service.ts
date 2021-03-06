import { NotificationService } from "app/notification/notification.service";
import { Injectable } from "@angular/core";
import { Observer } from "rxjs/Observer";
import { Observable } from "rxjs/Observable";

@Injectable()
export class GeolocationService {
  constructor(private _notificationService: NotificationService) {}

  getCurrentPosition(): Observable<Position> {
    return new Observable((observer: Observer<Position>) => {
      // Invokes getCurrentPosition method of Geolocation API.

      const geo_options = {
        enableHighAccuracy: false,
        maximumAge: 180000,
        timeout: 10000
      };

      navigator.geolocation.getCurrentPosition(
        (position: Position) => {
          observer.next(position);
          observer.complete();
        },
        (error: PositionError) => {
          const message = "Geolocation service: " + error.message;
          console.log(message);
          this._notificationService.addNotification(message);
          observer.error(error);
        },
        geo_options
      );
    });
  }
}
