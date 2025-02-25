import { Route } from '@angular/router';
import { permissionGuard } from '../../../core/guards/permission.guard';
import { AuthGuard } from '../../../core/guards/auth.guard';
import { CreateCompanyAdOfferComponent } from '../components/ads-offers/create-company-ad-offer/create-company-ad-offer.component';

export const AdOfferRoutes: Route[] = [
  {
    path: 'create-offer-for-ad/:adId',
    component: CreateCompanyAdOfferComponent,
    canActivate: [AuthGuard, permissionGuard],
    data: { permission: 250 },
  },
];
