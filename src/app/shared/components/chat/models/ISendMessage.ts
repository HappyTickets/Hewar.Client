export interface ISendMessage {
  content?: string; 
  medias: { type: string, url: string }[];
  chatId: number | null;
}

