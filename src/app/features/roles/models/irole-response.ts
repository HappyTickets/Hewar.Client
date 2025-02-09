export interface IRoleResponse<T> {
  status: number; // HTTP status code
  isSuccess: boolean; // Indicates if the request was successful
  errorCode: number; // Error code if any
  successCode: number; // Success code for the operation
  data: T; // Generic type for the response data
}
