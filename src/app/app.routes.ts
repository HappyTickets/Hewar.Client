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
import { CompanyOffersComponent } from './features/my-offers/components/company-offers/company-offers.component';
import { FacilityOffersComponent } from './features/my-offers/components/facility-offers/facility-offers.component';
import { EditPriceRequestComponent } from './features/price-requests/components/edit-price-request/edit-price-request.component';
import { EditPriceOfferComponent } from './features/my-offers/components/edit-price-offer/edit-price-offer.component';
import { PriceRequestDetailsComponent } from './features/price-requests/components/price-request-details/price-request-details.component';
import { PriceOfferDetailsComponent } from './features/my-offers/components/price-offer-details/price-offer-details.component';
import { CompanyPriceRequestsComponent } from './features/price-requests/components/company-price-requests/company-price-requests.component';
import { SecurityCertificateComponent } from './features/security-certificate/components/security-certificate/security-certificate.component';
import { ContractFormComponent } from './features/contracts/components/contract-form/contract-form.component';
import { ContractPreviewComponent } from './features/contracts/components/contract-preview/contract-preview.component';

import { ImageUploadTestComponent } from './image-upload-test/image-upload-test.component';

export const routes: Route[] = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'guards', component: GuardsComponent },
  { path: 'insurance-ads', component: InsuranceAdsComponent },

  // Facilities
  { path: 'allfacilities', component: ListFacilityComponent },
  { path: 'createFacilities', component: CreateFacilityComponent,},
  { path: 'update-facility/:id', component: UpdateFacilityComponent },
  { path: 'facilities/:id', component: DetialsFacilityComponent,},
  { path: 'facilities', component: FacilitiesComponent },

  // Companies
  { path: 'companies', component: CompaniesComponent },
  { path: 'companies/updateCompany/:id', component: UpdateCompanyComponent },
  { path: 'companies/companyDetails/:id', component: CompanyDetailsComponent },
  { path: 'companies/createCompany', component: CreateCompanyComponent },

  // Price Requests
  { path: 'company-price-request', component: CompanyPriceRequestsComponent },
  { path: 'facility-price-request', component: FacilityPriceRequestsComponent },
  { path: 'price-request-details/:id', component: PriceRequestDetailsComponent },
  { path: 'create-price-request/:companyId', component: EditPriceRequestComponent },
  { path: 'update-price-request/:priceRequestId', component: EditPriceRequestComponent },

  // Price Offers
  { path: 'company-price-offer', component: CompanyOffersComponent },
  { path: 'facility-price-offer', component: FacilityOffersComponent },
  { path: 'create-price-offer/:priceRequestId', component: EditPriceOfferComponent },
  { path: 'update-price-offer/:priceOfferId', component: EditPriceOfferComponent },
  { path: 'price-offer-details/:id', component: PriceOfferDetailsComponent },

  // Registration
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'create-reset-password', component: CreateResetPasswordComponent },

  // Testing
  { path: 'upload-test', component: ImageUploadTestComponent },

  // Security Certificate
  { path: 'security-certificate', component: SecurityCertificateComponent },

  // Contracts
  { path: 'contract-form/:id', component: ContractFormComponent },
  { path: 'contract-preview/:id', component: ContractPreviewComponent },


  { path: '**', component: NotFoundComponent }, // wild card path
];
