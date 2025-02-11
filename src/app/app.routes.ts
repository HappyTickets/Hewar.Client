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
import { CompanyPriceRequestsComponent } from './features/price-requests/components/company-price-requests/company-price-requests.component';
import { CreatePriceOfferComponent } from './features/my-offers/components/create-price-offer/create-price-offer.component';
import { UpdatePriceOfferComponent } from './features/my-offers/components/update-price-offer/update-price-offer.component';
import { CompanyOffersComponent } from './features/my-offers/components/company-offers/company-offers.component';
import { FacilityOffersComponent } from './features/my-offers/components/facility-offers/facility-offers.component';
import { EditPriceRequestComponent } from './features/price-requests/components/edit-price-request/edit-price-request.component';


export const routes: Route[] = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },

  { path: 'guards', component: GuardsComponent },

  { path: 'insurance-ads', component: InsuranceAdsComponent },

  { path: 'facilities', component: FacilitiesComponent },

  { path: 'companies', component: CompaniesComponent },
  { path: 'companies/createCompany', component: CreateCompanyComponent },
  { path: 'companies/updateCompany/:id', component: UpdateCompanyComponent },
  { path: 'companies/companyDetails/:id', component: CompanyDetailsComponent },

  { path: 'facilities', component: ListFacilityComponent },
  { path: 'createFacilities', component: CreateFacilityComponent },
  { path: 'update-facility/:id', component: UpdateFacilityComponent },
  { path: 'facilities/:id', component: DetialsFacilityComponent },

  { path: 'company-price-request', component: CompanyPriceRequestsComponent },
  { path: 'facility-price-request', component: FacilityPriceRequestsComponent },
  { path: 'company-price-offer', component: CompanyOffersComponent },
  { path: 'facility-price-offer', component: FacilityOffersComponent },
  { path: 'create-price-request/:companyId', component: EditPriceRequestComponent },
  { path: 'update-price-request/:priceRequestId', component: EditPriceRequestComponent },
  { path: 'create-price-offer/:id', component: CreatePriceOfferComponent },
  { path: 'update-price-offer/:id', component: UpdatePriceOfferComponent },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'create-reset-password', component: CreateResetPasswordComponent },

  { path: '**', component: NotFoundComponent }, // wild card path
];
