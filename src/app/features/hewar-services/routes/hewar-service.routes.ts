import { Route } from '@angular/router';
import { AuthGuard } from '../../../core/guards/auth.guard';
import { CreateServicesComponent } from '../create-services/create-services.component';
import { ServicessListComponent } from '../servicess-list/servicess-list.component';
import { UpdateServicesComponent } from '../update-services/update-services.component';

export const HewarRoutes: Route[] = [
  {
    path: 'get-all-hewar-services',
    component: ServicessListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'creat-hewar-service',
    component: CreateServicesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'update-hewar-service/:id',
    component: UpdateServicesComponent,
    canActivate: [AuthGuard],
  },
];
