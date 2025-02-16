export interface IResponse<T> {
  status: number;
  isSuccess: boolean;
  successCode: number;
  data: T; // ID Of Service
}
