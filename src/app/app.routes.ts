import { Route } from '@angular/router';
import { GuardsComponent } from './features/guards/guards.component';
import { InsuranceAdsComponent } from './features/insurance-ads/insurance-ads.component';
import { FacilitiesComponent } from './features/facilities/facilities.component';
import { CompaniesComponent } from './features/companies/companies.component';
import { CreateCompanyComponent } from './features/companies/components/create-company/create-company.component';
import { HomePageComponent } from './features/home-page/home-page.component';
import { LoginComponent } from './features/auth/components/login/login.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { RegisterComponent } from './features/auth/components/register/register.component';
import { CreateResetPasswordComponent } from './features/auth/components/create-reset-password/create-reset-password.component';

import { ListFacilityComponent } from './features/facilities/list-facility/list-facility.component';
import { CreateFacilityComponent } from './features/facilities/create-facility/create-facility.component';
import { UpdateFacilityComponent } from './features/facilities/update-facility/update-facility.component';
import { DetialsFacilityComponent } from './features/facilities/detials-facility/detials-facility.component';
import { UpdateCompanyComponent } from './features/companies/components/update-company/update-company.component';
import { CompanyDetailsComponent } from './features/companies/components/company-details/company-details.component';
import { FacilityPriceRequestsComponent } from './features/price-requests/components/facility-price-requests/facility-price-requests.component';
import { CompanyOffersComponent } from './features/price-offers/components/company-offers/company-offers.component';
import { FacilityOffersComponent } from './features/price-offers/components/facility-offers/facility-offers.component';
import { EditPriceRequestComponent } from './features/price-requests/components/edit-price-request/edit-price-request.component';
import { EditPriceOfferComponent } from './features/price-offers/components/edit-price-offer/edit-price-offer.component';
import { PriceRequestDetailsComponent } from './features/price-requests/components/price-request-details/price-request-details.component';
import { PriceOfferDetailsComponent } from './features/price-offers/components/price-offer-details/price-offer-details.component';
import { CompanyPriceRequestsComponent } from './features/price-requests/components/company-price-requests/company-price-requests.component';
import { SecurityCertificateComponent } from './features/security-certificate/components/security-certificate/security-certificate.component';

import { AdsComponent } from './features/ads/components/ads/ads.component';
import { AllAdsComponent } from './features/ads/components/all-ads/all-ads.component';


import { CreateServicesComponent } from './features/hewar-services/create-services/create-services.component';
import { ServicessListComponent } from './features/hewar-services/servicess-list/servicess-list.component';
import { UpdateServicesComponent } from './features/hewar-services/update-services/update-services.component';
import { UpdateCompanyServiceComponent } from './features/company-services/update-services/update-services.component';
import { ListServicesComponent } from './features/company-services/list-services/list-services.component';
import { CreateServiceComponent } from './features/company-services/create-service/create-service.component';


import { ContractFormComponent } from './features/contracts/components/contract-form/contract-form.component';
import { ContractPreviewComponent } from './features/contracts/components/contract-preview/contract-preview.component';

import { ImageUploadTestComponent } from './image-upload-test/image-upload-test.component';

import { NotificationTestComponent } from './notification-test/compenent/notification-test.component';
import { CreateCompanyAdOfferComponent } from './features/ads/components/ads-offers/create-company-ad-offer/create-company-ad-offer.component';
import { NotificationsComponent } from './shared/components/notifications/notifications.component';


export const routes: Route[] = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'guards', component: GuardsComponent },
  { path: 'insurance-ads', component: InsuranceAdsComponent },

  // Facilities
  { path: 'allfacilities', component: ListFacilityComponent },
  { path: 'createFacilities', component: CreateFacilityComponent },
  { path: 'update-facility/:id', component: UpdateFacilityComponent },
  { path: 'facilities/:id', component: DetialsFacilityComponent },
  { path: 'facilities', component: FacilitiesComponent },

  { path: 'companies', component: CompaniesComponent },
  { path: 'createCompany', component: CreateCompanyComponent },
  { path: 'companies/updateCompany/:id', component: UpdateCompanyComponent },
  { path: 'companies/companyDetails/:id', component: CompanyDetailsComponent },
  { path: 'companies/createCompany', component: CreateCompanyComponent },

  // Price Requests
  { path: 'company-price-request', component: CompanyPriceRequestsComponent },
  { path: 'facility-price-request', component: FacilityPriceRequestsComponent },
  {
    path: 'price-request-details/:id',
    component: PriceRequestDetailsComponent,
  },
  {
    path: 'create-price-request/:companyId',
    component: EditPriceRequestComponent,
  },
  {
    path: 'update-price-request/:priceRequestId',
    component: EditPriceRequestComponent,
  },

  // Price Offers
  { path: 'company-price-offer', component: CompanyOffersComponent },
  { path: 'facility-price-offer', component: FacilityOffersComponent },

  {
    path: 'create-price-offer/:priceRequestId',
    component: EditPriceOfferComponent,
  },
  {
    path: 'update-price-offer/:priceOfferId',
    component: EditPriceOfferComponent,
  },
  { path: 'price-offer-details/:id', component: PriceOfferDetailsComponent },


  // Registration
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'create-reset-password', component: CreateResetPasswordComponent },

  // Testing
  { path: 'upload-test', component: ImageUploadTestComponent },
  { path: 'Notifications-test', component: NotificationTestComponent },
  { path: 'Notifications', component: NotificationsComponent },

  // Security Certificate
  { path: 'security-certificate', component: SecurityCertificateComponent },

  // Ads
  { path: 'createAds', component: AdsComponent },
  { path: 'ads', component: AllAdsComponent },
  { path: 'ads/edit/:id', component: AdsComponent },
  { path: 'ad/:id', component: AdsComponent },

  // Ads Offers

  {path: 'create-offer-for-ad/:adId', component: CreateCompanyAdOfferComponent},


  // Hewar Services
  { path: 'get-all-hewar-services', component: ServicessListComponent },
  { path: 'creat-hewar-service', component: CreateServicesComponent },
  // Hewar Services
  { path: 'creat-hewar-service', component: CreateServicesComponent },
  { path: 'get-all-hewar-services', component: ServicessListComponent },
  { path: 'update-hewar-service/:id', component: UpdateServicesComponent },

  //Companies services
  { path: 'companyservices', component: ListServicesComponent },
  {
    path: 'update-company-services/:id',
    component: UpdateCompanyServiceComponent,
  },
  { path: 'create-company-service', component: CreateServiceComponent },

  // Contracts
  { path: 'contract-form/:id', component: ContractFormComponent },
  { path: 'contract-preview/:id', component: ContractPreviewComponent },
  { path: '**', component: NotFoundComponent }, // wild card path
];
