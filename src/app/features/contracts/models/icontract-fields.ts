import { ICreateContract } from './icreate-contract';

export interface IContractFields {
  offerId: number;
  contractId: number;
  contractFields: ICreateContract;
}
