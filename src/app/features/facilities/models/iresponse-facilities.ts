export interface IResponseFacilities<T> {
  status: number;
  isSuccess: boolean;
  errorCode: number;
  message: string;
  errors: string;
  data: T[];
}
