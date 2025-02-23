import { DataTypes } from "../../../shared/enums/data-types";

export interface IContractKey {
  id: number;
  keyId: number;
  keyName: string;
  value: string;
  dataType: DataTypes;
}
