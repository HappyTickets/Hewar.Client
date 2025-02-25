import { Route } from '@angular/router';
import { AuthGuard } from '../../../core/guards/auth.guard';
import { permissionGuard } from '../../../core/guards/permission.guard';
import { CompanyOffersComponent } from '../components/company-offers/company-offers.component';
import { EditPriceOfferComponent } from '../components/edit-price-offer/edit-price-offer.component';
import { FacilityOffersComponent } from '../components/facility-offers/facility-offers.component';
import { PriceOfferDetailsComponent } from '../components/price-offer-details/price-offer-details.component';
import { PriceOffersComponent } from '../components/price-offers/price-offers.component';

export const PriceOfferRoutes: Route[] = [
  {
    path: 'price-offers',
    component: PriceOffersComponent,
    canActivate: [AuthGuard, permissionGuard],
    data: { permission: 457 },
  },
  {
    path: 'company-price-offer',
    component: CompanyOffersComponent,
    canActivate: [AuthGuard, permissionGuard],
    data: { permission: 457 },
  },
  {
    path: 'facility-price-offer',
    component: FacilityOffersComponent,
    canActivate: [AuthGuard, permissionGuard],
    data: { permission: 457 },
  },
  {
    path: 'price-offer-details/:id',
    component: PriceOfferDetailsComponent,
    canActivate: [AuthGuard, permissionGuard],
    data: { permission: 457 },
  },
  {
    path: 'create-price-offer/:priceRequestId',
    component: EditPriceOfferComponent,
    canActivate: [AuthGuard, permissionGuard],
    data: { permission: 450 },
  },
  {
    path: 'update-price-offer/:priceOfferId',
    component: EditPriceOfferComponent,
    canActivate: [AuthGuard, permissionGuard],
    data: { permission: 451 },
  },
];
