export interface IGetMyOffersAsCompany {
  id: number,
  offer: string,
  status: number
  sentDate: string,
  insuranceAdId: number,
  facility: {
    id: number,
    name: string,
    imageUrl: string,
    email: string,
    phoneNumber: number
  }
}
