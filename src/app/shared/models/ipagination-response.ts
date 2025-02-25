import { ErrorCodes } from '../../core/enums/error-codes';
import { SuccessCodes } from '../../core/enums/success-codes';

export interface IPaginationResponse<T> {
  status: number;
  isSuccess?: boolean;
  errorCode: ErrorCodes;
  successCode: SuccessCodes;
  errors: string[];
  data: null | {
    items: T;
    totalPages: number;
    pageNumber: number;
    pageSize: number;
    hasPrevious: boolean;
    hasNext: boolean;
  };
}
