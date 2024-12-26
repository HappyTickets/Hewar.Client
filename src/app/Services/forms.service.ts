import { Injectable } from '@angular/core';
import { HttpClientFacadeService } from './http-client-facade.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormsService {

 endPoint:string='api/auth';

  constructor(private httpFacadeService: HttpClientFacadeService) {}

  getAll(): Observable<any> {
    return this.httpFacadeService.get(`${this.endPoint}`);
  }

  getById(id: any): Observable<any> {
    return this.httpFacadeService.get(`${this.endPoint}`);
  }

  create(endPointName:string , data: any): Observable<any> {
    return this.httpFacadeService.post(`${this.endPoint}/${endPointName}`, data);
  }

  update(id: string, data: any): Observable<any> {
    return this.httpFacadeService.put(this.endPoint, id, data);
  }

  delete(id: string): Observable<any> {
    return this.httpFacadeService.delete(this.endPoint, id);
  }
}
