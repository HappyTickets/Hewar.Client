import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ICreateTicket } from '../models/icreate-ticket';
import { AuthService } from '../../auth/services/auth.service';
import { Observable } from 'rxjs';
import { IResponse } from '../../../core/models/IResponse';
import { ITicket } from '../models/iticket';
import { ICreateTicketMsg } from '../models/icreate-ticket-msg';
import { ITicketMsg } from '../models/iticket-msg';

@Injectable({
  providedIn: 'root',
})
export class TicketsService {
  http = inject(HttpClient);
  authService = inject(AuthService);

  createTicket(ticket: ICreateTicket): Observable<IResponse<null>> {
    return this.http.post<IResponse<null>>('/api/tickets/createTicket', ticket);
  }

  closeTicket(id: string): Observable<IResponse<null>> {
    return this.http.patch<IResponse<null>>(`/api/tickets/closeTicket/${id}`, {});
  }

  getMyReceivedTickets(): Observable<IResponse<ITicket[]>> {
    return this.http.get<IResponse<ITicket[]>>(`/api/tickets/getMyReceivedTickets`);
  }

  getMySentTickets(): Observable<IResponse<ITicket[]>> {
    return this.http.get<IResponse<ITicket[]>>(`/api/tickets/getMySentTickets`);
  }

  createTicketMessage(message:ICreateTicketMsg): Observable<IResponse<null>> {
    return this.http.post<IResponse<null>>(`/api/tickets/createTicketMessage`, message);
  }

  getTicketMessages(id: string): Observable<IResponse<ITicketMsg[]>> {
    return this.http.get<IResponse<ITicketMsg[]>>(`/api/tickets/getTicketMessages${id}`);
  }
}
