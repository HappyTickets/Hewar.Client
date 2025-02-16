import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IResponseChat } from '../models/IGetChat';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  baseUrl = '/api/Chat/'
  constructor(private _httpClient:HttpClient) {}

  getChat(id:number):Observable<IResponseChat>{
    return this._httpClient.get<IResponseChat>(this.baseUrl + 'getMessagesByChatId?chatId=' + id)
  }
}
