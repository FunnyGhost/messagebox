import { NotificationService } from "app/notification/notification.service";
import { Message } from "./../models/message.model";
import { Observable } from "rxjs/Observable";
import { GeolocationService } from "./geolocation.service";
import { StoreModule } from "@ngrx/store";
import { MessageBackendService } from "./message-backend.service";
import { MessageService } from "./message.service";
import { HttpClientModule } from "@angular/common/http";
import { TestBed, inject } from "@angular/core/testing";

class FakeBackendService {
  getMessages(position: Position) {}

  saveMessage(messageToSave: Message) {}
}

class FakeGeolocationService {
  getCurrentPosition() {}
}

describe("MessageService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, StoreModule.forRoot({})],
      providers: [
        MessageService,
        NotificationService,
        { provide: MessageBackendService, useClass: FakeBackendService },
        { provide: GeolocationService, useClass: FakeGeolocationService }
      ]
    });
  });

  it(
    "should be created",
    inject([MessageService], (service: MessageService) => {
      expect(service).toBeTruthy();
    })
  );

  it(
    "should use user location when getting messages",
    inject([MessageService], (service: MessageService) => {
      const geolocationService = TestBed.get(GeolocationService);
      const messagesBackend = TestBed.get(MessageBackendService);
      const positionToReturn = {
        coords: {
          latitude: 11,
          longitude: 22
        }
      };

      const positionSpy = spyOn(
        geolocationService,
        "getCurrentPosition"
      ).and.returnValue(Observable.of(positionToReturn));
      const messagesSpy = spyOn(messagesBackend, "getMessages").and.returnValue(
        Observable.of([])
      );

      service.messages();

      expect(positionSpy).toHaveBeenCalled();
      expect(messagesSpy).toHaveBeenCalledWith(positionToReturn);
    })
  );

  it(
    "should use user location when saving a new message",
    inject([MessageService], (service: MessageService) => {
      const geolocationService = TestBed.get(GeolocationService);
      const messagesBackend = TestBed.get(MessageBackendService);
      const positionToReturn = {
        coords: {
          latitude: 11,
          longitude: 22
        }
      };
      const messageToSave: Message = new Message();
      messageToSave.latitude = 11;
      messageToSave.longitude = 22;

      const positionSpy = spyOn(
        geolocationService,
        "getCurrentPosition"
      ).and.returnValue(Observable.of(positionToReturn));
      const messagesSpy = spyOn(messagesBackend, "saveMessage").and.returnValue(
        Observable.of([])
      );

      service.addMessage(new Message());

      expect(positionSpy).toHaveBeenCalled();
      expect(messagesSpy).toHaveBeenCalledWith(messageToSave);
    })
  );
});
