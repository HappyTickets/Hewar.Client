import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { IResponseChat } from '../models/IGetChat';
import { ISendMessage } from '../models/ISendMessage';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  baseUrl = '/api/Chat/'
  constructor(private _httpClient:HttpClient) {}

  getChat(id:number | null):Observable<IResponseChat>{
    return this._httpClient.get<IResponseChat>(this.baseUrl + 'getMessagesByChatId?chatId=' + id)
  }

  initializePriceRequestChat(priceRequestId: number) {
    return this._httpClient.patch(this.baseUrl + 'initializePriceRequestChat?priceRequestId=' + priceRequestId, {});
  }
  sendMessage(data: ISendMessage) {
    return this._httpClient.post(this.baseUrl + 'sendPriceRequestMessage', data);
  }
  uploadFile(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('path', file.name);
    formData.append('file', file);
    return this._httpClient.post<{ url: string }>('/api/Files/upload', formData).pipe(
      map(response => response.url)
    );
  }
}
