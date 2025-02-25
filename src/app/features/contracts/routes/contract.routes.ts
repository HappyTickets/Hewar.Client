import { Route } from '@angular/router';
import { AuthGuard } from '../../../core/guards/auth.guard';
import { permissionGuard } from '../../../core/guards/permission.guard';
import { ContractFormComponent } from '../components/contract-form/contract-form.component';
import { ContractPreviewComponent } from '../components/contract-preview/contract-preview.component';

export const ContractRoutes: Route[] = [
  {
    path: 'contract-form/:id',
    component: ContractFormComponent,
    canActivate: [AuthGuard, permissionGuard],
    data: { permission: 301 },
  },
  {
    path: 'contract-preview/:id',
    component: ContractPreviewComponent,
    canActivate: [AuthGuard, permissionGuard],
    data: { permission: 302 },
  },
];
