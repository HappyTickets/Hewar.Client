import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientFacadeService } from './http-client-facade.service';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {

  endPoint:string='api/companies';

  constructor(private httpFacadeService: HttpClientFacadeService) {}

  getAll(): Observable<any> {
    return this.httpFacadeService.get(`${this.endPoint}/getAll`);
  }

  getById(id: any): Observable<any> {
    const params:any = new HttpParams().set('id', id);
    return this.httpFacadeService.get(`${this.endPoint}/getById`, params);
  }

  create(data: any): Observable<any> {
    return this.httpFacadeService.post(this.endPoint, data);
  }

  update(id: string, data: any): Observable<any> {
    return this.httpFacadeService.put(this.endPoint, id, data);
  }

  delete(id: string): Observable<any> {
    return this.httpFacadeService.delete(this.endPoint, id);
  }
}
