import { IContractKey } from './icontract-key';

export interface IContract {
  contractId: number;
  contractKeys: IContractKey[];
}
