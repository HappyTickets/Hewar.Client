export interface IGetOpenedAds {
  id: number,
  securityRole: number,
  guardsCount: number,
  workShift: number,
  contractType: number,
  startDate: string,
  endDate: string,
  description: string,
  status: number,
  facility: {
    id: number,
    name: string,
    imageUrl: string,
    email: string,
    phoneNumber: number
  }
}
