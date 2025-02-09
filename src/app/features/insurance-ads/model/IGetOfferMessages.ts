export interface IGetOfferMessages {
  id: number,
  content: string,
  medias: [
    {
      type: string,
      url: string
    }
  ],
  sentDate: string,
  senderId: number,
  senderType: number
}
