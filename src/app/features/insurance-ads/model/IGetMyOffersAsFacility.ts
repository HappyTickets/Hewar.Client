export interface IGetMyOffersAsFacility {
  id: number,
  offer: string,
  status: number,
  sentDate: string,
  insuranceAdId: number,
  company: {
    id: number,
    name: string,
    imageUrl: string,
    email: string,
    phoneNumber: number
  }
}
