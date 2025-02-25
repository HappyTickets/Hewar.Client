import { Route } from '@angular/router';
import { AuthGuard } from '../../../core/guards/auth.guard';
import { permissionGuard } from '../../../core/guards/permission.guard';
import { SecurityCertificateComponent } from '../components/security-certificate/security-certificate.component';

export const SecurityCertificateRoutes: Route[] = [
  {
    path: 'security-certificate',
    component: SecurityCertificateComponent,
    canActivate: [AuthGuard, permissionGuard],
    data: { permission: 653 },
  },
];
