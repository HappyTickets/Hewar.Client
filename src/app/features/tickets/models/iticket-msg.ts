export interface ITicketMsg {
  id: number;
  content: string;
  medias: { type: string; url: string }[];
  sentDate: Date;
  senderId: number;
  senderType: number;
}
