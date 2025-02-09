export interface IApiResponse<T> {
  status: number;
  isSuccess: boolean;
  errorCode: number;
  successCode: number;
  data: T | null;
}
