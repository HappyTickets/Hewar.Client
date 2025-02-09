import { ErrorCodes } from "../../core/enums/error-codes";
import { SuccessCodes } from "../../core/enums/success-codes";

export interface IApiResponse<T> {
  status: number;
  isSuccess?: boolean;
  errorCode: ErrorCodes;
  successCode: SuccessCodes;
  errors: string[];
  data: T | null;
}
