import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRoleResponse } from '../models/irole-response';
import { IRole } from '../models/irole';
import { IRoleCreate } from '../models/irole-create';
import { IRoleUpdate } from '../models/irole-update';
import { IAssignUsersToRole } from '../models/iassign-users-to-role';
import { IAssignRolesToUser } from '../models/iassign-roles-to-user';
import { IUnassignUsersFromRole } from '../models/iunassign-users-from-role';
import { IUserData } from '../models/iuser-data';
import { IResponseUserRoles } from '../models/iresponse-user-roles';
import { IRoleUsersResponse } from '../models/iuser-by-role';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private apiUrl = '/api/roles';
  constructor(private http: HttpClient) {}
  createRole(role: IRoleCreate): Observable<IRoleResponse<IRole>> {
    return this.http.post<IRoleResponse<IRole>>(`${this.apiUrl}/create`, role);
  }

  //there are some issues with validation when you assign roleNam to guard
  updateRole(roleUpdate: IRoleUpdate): Observable<IRoleResponse<IRole>> {
    return this.http.put<IRoleResponse<IRole>>(
      `${this.apiUrl}/update`,
      roleUpdate
    );
  }

  deleteRole(roleId: number): Observable<IRoleResponse<any>> {
    return this.http.delete<IRoleResponse<any>>(
      `${this.apiUrl}/delete/${roleId}`
    );
  }

  getRoles(): Observable<IRoleResponse<IRole>> {
    return this.http.get<IRoleResponse<IRole>>(`${this.apiUrl}/getAll`);
  }
  getRoleById(id: number): Observable<IRoleResponse<IRole>> {
    return this.http.get<IRoleResponse<IRole>>(`${this.apiUrl}/getById/${id}`);
  }
  assignUsersToRole(payload: IAssignUsersToRole): Observable<any> {
    return this.http.post(`${this.apiUrl}/assign-users`, payload);
  }
  assignRolesToUser(payload: IAssignRolesToUser): Observable<any> {
    return this.http.post(`${this.apiUrl}/assign-user-to-roles`, payload);
  }
  unassignUsersFromRole(payload: IUnassignUsersFromRole): Observable<any> {
    return this.http.post(`${this.apiUrl}/remove-users`, payload);
  }
  getAssignedRolesByUserId(
    userId: number
  ): Observable<IResponseUserRoles<IUserData>> {
    return this.http.get<IResponseUserRoles<IUserData>>(
      `${this.apiUrl}/users/${userId}/roles`
    );
  }

  getUsersWithRoles(
    pageIndex?: number,
    pageSize?: number,
    paginationOff?: boolean,
    searchKey?: string,
    searchIn?: string,
    fromDate?: string,
    toDate?: string,
    orderBy?: string,
    isDescending?: boolean
  ): Observable<IRoleUsersResponse> {
    let params = new HttpParams();

    // Add query parameters only if they are provided
    if (pageIndex !== undefined) {
      params = params.append('PageIndex', pageIndex.toString());
    }

    if (pageSize !== undefined) {
      params = params.append('PageSize', pageSize.toString());
    }

    if (paginationOff !== undefined) {
      params = params.append('PaginationOff', paginationOff.toString());
    }

    if (searchKey) {
      params = params.append('SearchKey', searchKey);
    }

    if (searchIn) {
      params = params.append('SearchIn', searchIn);
    }

    if (fromDate) {
      params = params.append('FromDate', fromDate);
    }

    if (toDate) {
      params = params.append('ToDate', toDate);
    }

    if (orderBy) {
      params = params.append('OrderBy', orderBy);
    }

    if (isDescending !== undefined) {
      params = params.append('IsDescending', isDescending.toString());
    }

    const url = `${this.apiUrl}/users-with-roles`;
    // Make the HTTP GET request with the parameters
    return this.http.get<IRoleUsersResponse>(url, { params });
  }
  getAssignedUsersToRole(
    roleId: number,
    pageIndex?: number,
    pageSize?: number,
    paginationOff?: boolean,
    searchKey?: string,
    searchIn?: string,
    fromDate?: string,
    toDate?: string,
    orderBy?: string,
    isDescending?: boolean
  ): Observable<IRoleUsersResponse> {
    let params = new HttpParams();

    // Add query parameters only if they are provided
    if (pageIndex !== undefined) {
      params = params.append('PageIndex', pageIndex.toString());
    }

    if (pageSize !== undefined) {
      params = params.append('PageSize', pageSize.toString());
    }

    if (paginationOff !== undefined) {
      params = params.append('PaginationOff', paginationOff.toString());
    }

    if (searchKey) {
      params = params.append('SearchKey', searchKey);
    }

    if (searchIn) {
      params = params.append('SearchIn', searchIn);
    }

    if (fromDate) {
      params = params.append('FromDate', fromDate);
    }

    if (toDate) {
      params = params.append('ToDate', toDate);
    }

    if (orderBy) {
      params = params.append('OrderBy', orderBy);
    }

    if (isDescending !== undefined) {
      params = params.append('IsDescending', isDescending.toString());
    }

    // Construct the full URL with the roleId in the path
    const url = `${this.apiUrl}/roles/${roleId}/users`;

    // Make the HTTP GET request with the constructed URL and query parameters
    return this.http.get<IRoleUsersResponse>(url, { params });
  }
}
