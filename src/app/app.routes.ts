import { Route } from '@angular/router';
import { HomePageComponent } from './features/home-page/home-page.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { ImageUploadTestComponent } from './image-upload-test/image-upload-test.component';
import { NotificationTestComponent } from './notification-test/compenent/notification-test.component';
import { NotificationsComponent } from './shared/components/notifications/notifications.component';
import { UnauthorizedComponent } from './shared/components/unauthorized/unauthorized.component';
import { FacilitiesRoutes } from './features/facilities/routes/facilities.routes';
import { authRoutes } from './features/auth/routes/auth.routes';
import { CompaniesRoutes } from './features/companies/routes/companies.routes';
import { CompanyServicesRoutes } from './features/company-services/routes/company-services.routes';
import { AdRoutes } from './features/ads/routes/ad.routes';
import { AdOfferRoutes } from './features/ads/routes/ad-offer.routes';
import { ContractRoutes } from './features/contracts/routes/contract.routes';
import { PriceRequestRoutes } from './features/price-requests/routes/price-request.routes';
import { PriceOfferRoutes } from './features/price-offers/routes/price-offer.routes';
import { SecurityCertificateRoutes } from './features/security-certificate/routes/security-certificate.routes';
import { HewarRoutes } from './features/hewar-services/routes/hewar-service.routes';

export const routes: Route[] = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  ...SecurityCertificateRoutes,
  ...CompanyServicesRoutes,
  ...PriceRequestRoutes,
  ...FacilitiesRoutes,
  ...PriceOfferRoutes,
  ...CompaniesRoutes,
  ...ContractRoutes,
  ...AdOfferRoutes,
  ...HewarRoutes,
  ...authRoutes,
  ...AdRoutes,

  // Testing
  { path: 'upload-test', component: ImageUploadTestComponent },
  { path: 'Notifications-test', component: NotificationTestComponent },
  { path: 'Notifications', component: NotificationsComponent },

  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: '**', component: NotFoundComponent }, // wild card path
];
