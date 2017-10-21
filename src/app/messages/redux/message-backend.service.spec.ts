import { HttpClientModule } from "@angular/common/http";
import { TestBed, inject } from "@angular/core/testing";

import { MessageBackendService } from "./message-backend.service";

describe("MessageBackendService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [MessageBackendService]
    });
  });

  it("should be created", inject([MessageBackendService], (service: MessageBackendService) => {
    expect(service).toBeTruthy();
  }));
});
