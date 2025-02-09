export interface ICreateCompany {
  contactEmail: string,
  phoneNumber: string,
  registrationNumber: string,
  taxId: string,
  name: string,
  adminInfo: {
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    phone: string,
    imageUrl: File | null;
  },
  address: {
    street: string,
    city: string,
    state: string,
    country: string,
    postalCode: string
  }
}


