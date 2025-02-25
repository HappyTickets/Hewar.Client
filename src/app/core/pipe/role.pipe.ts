import { inject, Pipe, PipeTransform } from '@angular/core';
import { PermissionService } from '../../features/auth/services/permission.service';

@Pipe({
  name: 'role',
  standalone: true,
})
export class RolePipe implements PipeTransform {
  private permissionService = inject(PermissionService);

  transform(role: string): boolean {
    return this.permissionService.hasRole(role);
  }
}
