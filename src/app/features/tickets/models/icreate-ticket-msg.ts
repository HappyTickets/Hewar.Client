export interface ICreateTicketMsg {
  ticketId: number;
  content: string;
  medias: { type: string; url: string }[];
}
