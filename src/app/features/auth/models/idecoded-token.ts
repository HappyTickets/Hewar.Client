export enum EntityType {
  Company = 'Company',
  Facility = 'Facility',
}

export interface IDecodedToken {
  UserId: string;
  exp: number;
  EntityId: string;
  EntityType: EntityType;
  'http://schemas.microsoft.com/ws/2008/06/identity/claims/role': string;
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress': string;
}
