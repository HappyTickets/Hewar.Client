export interface ICompany {
  id: number,
  contactEmail: string,
  phoneNumber: string,
  registrationNumber: string,
  taxId: string,
  name: string,
  address: {
    street: string,
    city: string,
    state: string,
    country: string,
    postalCode: string
  }
}
