export interface ICreateOfferMessage {
  content: string,
  medias: [
    {
      type: string,
      url: string
    }
  ],
  insuranceAdOfferId: number
}
