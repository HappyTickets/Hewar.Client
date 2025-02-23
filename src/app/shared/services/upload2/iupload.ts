export interface ImageUpload {
  path: string;
  fileData: File;
}

export interface Response {
  type: string;
  url: string;
}

export interface ImageUploadResponse<T> {
  status: number;
  isSuccess: boolean;
  errorCode: number;
  message: string;
  errors: string;
  data: T[];
}
