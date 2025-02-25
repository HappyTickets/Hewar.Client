import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from './storage.service';
import { Permissions } from '../../../shared/enums/permissions';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  private storageService =  inject(StorageService)
  private permissionsSubject = new BehaviorSubject<Permissions[]>(this.loadPermissions());
  permissions$ = this.permissionsSubject.asObservable();

  private loadPermissions(): Permissions[] {
    const storedPermissions = this.getCookie('permissions');
    return storedPermissions ? JSON.parse(storedPermissions) : [];
  }

  setPermissions(permissions: Permissions[]) {
    this.permissionsSubject.next(permissions);
    document.cookie = `permissions=${JSON.stringify(permissions)}; path=/;`;
  }

  hasPermission(permission: Permissions): boolean {
    return this.isAdmin() || this.permissionsSubject.value.includes(permission);
  }

  isAdmin(): boolean {
    return this.storageService.isSuperAdmin();
  }
  private getCookie(name: string): string | null {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const [key, value] = cookie.trim().split('=');
      if (key === name) {
        return value;
      }
    }
    return null;
  }
}
