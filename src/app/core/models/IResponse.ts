import { ErrorCodes } from "../enums/error-codes";

export interface IResponse<T> {
  status: number,
  isSuccess: boolean,
  errorCode: ErrorCodes,
  // message?: string,
  // errors?: string,
  successCode: number,
  data: T
}
