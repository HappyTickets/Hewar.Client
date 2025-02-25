import { Route } from '@angular/router';
import { AuthGuard } from '../../../core/guards/auth.guard';
import { permissionGuard } from '../../../core/guards/permission.guard';
import { CreateServiceComponent } from '../create-service/create-service.component';
import { ListServicesComponent } from '../list-services/list-services.component';
import { UpdateCompanyServiceComponent } from '../update-services/update-services.component';

export const CompanyServicesRoutes: Route[] = [
  {
    path: 'companyservices',
    component: ListServicesComponent,
    canActivate: [AuthGuard, permissionGuard],
    data: { permission: 57 },
  },
  {
    path: 'update-company-services/:id',
    component: UpdateCompanyServiceComponent,
    canActivate: [AuthGuard, permissionGuard],
    data: { permission: 55 },
  },
  {
    path: 'create-company-service',
    component: CreateServiceComponent,
    canActivate: [AuthGuard, permissionGuard],
    data: { permission: 54 },
  },
];
