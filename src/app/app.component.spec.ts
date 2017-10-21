import { HttpClientModule } from "@angular/common/http";
import { MessageBackendService } from "./messages/redux/message-backend.service";
import { GeolocationService } from "./messages/redux/geolocation.service";
import { StoreModule } from "@ngrx/store";
import { MessageService } from "./messages/redux/message.service";
import { TestBed, async } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { AlertModule } from "ngx-bootstrap/alert";

import { AppComponent } from "./app.component";
import { NotificationService } from "app/notification/notification.service";

describe("AppComponent", () => {
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          AlertModule.forRoot(),
          RouterTestingModule,
          HttpClientModule,
          StoreModule.forRoot({})
        ],
        declarations: [AppComponent],
        providers: [
          NotificationService,
          MessageService,
          GeolocationService,
          MessageBackendService
        ]
      }).compileComponents();
    })
  );

  it(
    "should create the app",
    async(() => {
      const messageService = TestBed.get(MessageService);
      const spy = spyOn(
        messageService,
        "synchronizeMessages"
      ).and.callFake(() => {});

      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;

      fixture.detectChanges();

      expect(app).toBeTruthy();
    })
  );

  it(
    "should initialize the store",
    async(() => {
      const messageService = TestBed.get(MessageService);
      const spy = spyOn(
        messageService,
        "synchronizeMessages"
      ).and.callFake(() => {});

      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;

      fixture.detectChanges();

      expect(spy).toHaveBeenCalled();
    })
  );
});
