import { Message } from "./../models/message.model";
import { Observable } from "rxjs/Observable";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class MessageBackendService {
  private _messageBoxUrl = "https://messageboxio.azurewebsites.net/api/MessageBox";
  private _authorizationHeader = "Basic VmFsaWRVc2VyOlZhbGlkUGFzc3dvcmQ=";

  constructor(private _http: HttpClient) {}

  getMessages(position: Position): Observable<Message[]> {
    const url: string =
      this._messageBoxUrl +
      `?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}`;

    return this._http.get<Message[]>(url, {
      headers: new HttpHeaders().set("Authorization", this._authorizationHeader)
    });
  }

  saveMessage(messageToSave: Message): Observable<any> {
    return this._http.post(this._messageBoxUrl, messageToSave, {
      headers: new HttpHeaders().set("Authorization", this._authorizationHeader)
    });
  }
}
