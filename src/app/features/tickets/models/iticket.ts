import { TicketStatus } from '../../../shared/enums/ticket-status';

export interface ITicket {
  id: number;
  Title: string;
  OpenedDate: Date;
  ClosedDate: Date;
  Status: TicketStatus;
}
