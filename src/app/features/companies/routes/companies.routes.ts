import { Route } from '@angular/router';
import { AuthGuard } from '../../../core/guards/auth.guard';
import { permissionGuard } from '../../../core/guards/permission.guard';
import { CompaniesComponent } from '../companies.component';
import { CompanyDetailsComponent } from '../components/company-details/company-details.component';
import { CreateCompanyComponent } from '../components/create-company/create-company.component';
import { UpdateCompanyComponent } from '../components/update-company/update-company.component';

export const CompaniesRoutes: Route[] = [
  {
    path: 'companies',
    component: CompaniesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'companies/updateCompany/:id',
    component: UpdateCompanyComponent,
    canActivate: [AuthGuard, permissionGuard],
    data: { permission: 51 },
  },
  {
    path: 'companies/createCompany',
    component: CreateCompanyComponent,
    canActivate: [AuthGuard, permissionGuard],
    data: { permission: 50 },
  },
  {
    path: 'companies/companyDetails/:id',
    component: CompanyDetailsComponent,
    canActivate: [AuthGuard],
  },
];
