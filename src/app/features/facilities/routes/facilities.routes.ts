import { Route } from '@angular/router';
import { AuthGuard } from '../../../core/guards/auth.guard';
import { permissionGuard } from '../../../core/guards/permission.guard';
import { CreateFacilityComponent } from '../create-facility/create-facility.component';
import { DetialsFacilityComponent } from '../detials-facility/detials-facility.component';
import { FacilitiesComponent } from '../facilities.component';
import { ListFacilityComponent } from '../list-facility/list-facility.component';
import { UpdateFacilityComponent } from '../update-facility/update-facility.component';

export const FacilitiesRoutes: Route[] = [
  {
    path: 'allfacilities',
    component: ListFacilityComponent,
    canActivate: [AuthGuard, permissionGuard],
    data: { permission: 103 },
  },
  {
    path: 'createFacilities',
    component: CreateFacilityComponent,
    canActivate: [AuthGuard, permissionGuard],
    data: { permission: 100 },
  },
  {
    path: 'update-facility/:id',
    component: UpdateFacilityComponent,
    canActivate: [AuthGuard, permissionGuard],
    data: { permission: 101 },
  },
  {
    path: 'facilities/:id',
    component: DetialsFacilityComponent,
    canActivate: [AuthGuard, permissionGuard],
    data: { permission: 103 },
  },
  {
    path: 'facilities',
    component: FacilitiesComponent,
    canActivate: [AuthGuard, permissionGuard],
    data: { permission: 103 },
  },
];
