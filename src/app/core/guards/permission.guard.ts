import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { PermissionService } from '../../features/auth/services/permission.service';

export const permissionGuard: CanActivateFn = (route) => {
  const permissionService = inject(PermissionService);
  const router = inject(Router);

  const requiredPermission = route.data['permission'];
  if (permissionService.isAdmin()) {
    return true;
  }
  if (!permissionService.hasPermission(requiredPermission)) {
    router.navigate(['/unauthorized']);
    return false;
  }
  return true;
};
