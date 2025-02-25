import { Route } from '@angular/router';
import { AuthGuard } from '../../../core/guards/auth.guard';
import { permissionGuard } from '../../../core/guards/permission.guard';
import { CompanyPriceRequestsComponent } from '../components/company-price-requests/company-price-requests.component';
import { EditPriceRequestComponent } from '../components/edit-price-request/edit-price-request.component';
import { FacilityPriceRequestsComponent } from '../components/facility-price-requests/facility-price-requests.component';
import { PriceRequestDetailsComponent } from '../components/price-request-details/price-request-details.component';
import { PriceRequestComponent } from '../components/price-request/price-request.component';

export const PriceRequestRoutes: Route[] = [
  {
    path: 'price-requests',
    component: PriceRequestComponent,
    canActivate: [AuthGuard, permissionGuard],
    data: { permission: 404 },
  },
  {
    path: 'company-price-request',
    component: CompanyPriceRequestsComponent,
    canActivate: [AuthGuard, permissionGuard],
    data: { permission: 404 },
  },
  {
    path: 'facility-price-request',
    component: FacilityPriceRequestsComponent,
    canActivate: [AuthGuard, permissionGuard],
    data: { permission: 404 },
  },
  {
    path: 'price-request-details/:id',
    component: PriceRequestDetailsComponent,
    canActivate: [AuthGuard, permissionGuard],
    data: { permission: 404 },
  },
  {
    path: 'create-price-request/:companyId',
    component: EditPriceRequestComponent,
    canActivate: [AuthGuard, permissionGuard],
    data: { permission: 400 },
  },
  {
    path: 'update-price-request/:priceRequestId',
    component: EditPriceRequestComponent,
    canActivate: [AuthGuard, permissionGuard],
    data: { permission: 401 },
  },
];
