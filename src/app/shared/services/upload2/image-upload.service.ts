import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ImageUpload } from './iupload';

@Injectable({
  providedIn: 'root',
})
export class ImageUploadService {
  private baseUrl = '/api/files';

  constructor(private http: HttpClient) {}
  // uploadImageBase64(path: string, base64String: string): Observable<any> {
  //   const payload = {
  //     Path: path,
  //     Base64: base64String,
  //     Base64EncodedString: base64String,
  //   };

  //   return this.http.post(`${this.baseUrl}/upload`, payload);
  // }
  uploadImageBinary(path: string, file: File): Observable<ImageUpload> {
    const formData = new FormData();
    formData.append('Path', path);
    formData.append('FileData', file);

    return this.http.post<any>(`${this.baseUrl}/upload`, formData);
  }
}
