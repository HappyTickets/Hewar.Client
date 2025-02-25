import { Route } from '@angular/router';
import { AuthGuard } from '../../../core/guards/auth.guard';
import { permissionGuard } from '../../../core/guards/permission.guard';
import { AdsComponent } from '../components/ads/ads.component';
import { AllAdsComponent } from '../components/all-ads/all-ads.component';

export const AdRoutes: Route[] = [
  {
    path: 'createAds',
    component: AdsComponent,
    canActivate: [AuthGuard, permissionGuard],
    data: { permission: 200 },
  },
  {
    path: 'ads',
    component: AllAdsComponent,
    canActivate: [AuthGuard, permissionGuard],
    data: { permission: 203 },
  },
  {
    path: 'ads/edit/:id',
    component: AdsComponent,
    canActivate: [AuthGuard, permissionGuard],
    data: { permission: 201 },
  },
  {
    path: 'ad/:id',
    component: AdsComponent,
    canActivate: [AuthGuard, permissionGuard],
    data: { permission: 203 },
  },
];
