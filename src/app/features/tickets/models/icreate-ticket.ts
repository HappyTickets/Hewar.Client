export interface ICreateTicket {
  title: string;
  content: string;
  medias: { type: string; url: string }[];
  audienceId: number;
  audienceType: number;
}
