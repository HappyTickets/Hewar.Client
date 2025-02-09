import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImageUploadService {
  private baseUrl = '/api/files';
  constructor(private http: HttpClient) {}
  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('path', file.name); // Append the actual file
    formData.append('base64', file); // Append the file name separately

    const req = new HttpRequest('POST', `${this.baseUrl}/upload`, formData, {
      reportProgress: true,
      responseType: 'json',
    });

    return this.http.request(req);
  }
  uploadFile(base64EncodedString: string, fileData: any): Observable<any> {
    const formData = {
      base64: base64EncodedString,
      fileData: fileData,
    };

    return this.http.post(this.baseUrl, formData);
  }

  // getFiles(): Observable<any> {
  //   return this.http.get(`${this.baseUrl}/files/upload`);
  // }
}
