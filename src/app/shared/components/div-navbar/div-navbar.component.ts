import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { Menubar } from 'primeng/menubar';
@Component({
  selector: 'app-div-navbar',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatMenuModule, RouterModule, Menubar],
  templateUrl: './div-navbar.component.html',
  styleUrl: './div-navbar.component.scss',
})
export class DivNavbarComponent {
  menuItems = [
    {
      label: 'Facilities',
      items: [
        { label: 'Facilities', routerLink: '/allfacilities' },
        { label: 'Create Facilities', routerLink: '/createFacilities' },
        { label: 'Update Facility', routerLink: '/update-facility/7' },
        { label: 'Facility Details/:id', routerLink: '/facilities/7' },
      ]
    },
    {
      label: 'Companies',
      items: [
        { label: 'All Companies', routerLink: '/companies' },
        { label: 'Create Companies', routerLink: '/companies/createCompany' },
        { label: 'Update Companies', routerLink: '/companies/updateCompany/17' },
        { label: 'Company Details', routerLink: '/companies/companyDetails/17' },
      ]
    },
    {
      label: 'Price Requests',
      items: [
        { label: "For Company", items: [
          {label: 'Company Price Request', routerLink: '/company-price-request'}
        ] },
        { label: "For Facility", items: [
          { label: 'Facility Price Request', routerLink: '/facility-price-request' },
          { label: 'Create Price Request', routerLink: 'create-price-request/18' },
          { label: 'Update Price Request', routerLink: 'update-price-request/72' },
          { label: 'Price Request Details', routerLink: 'price-request-details/72' },
        ] },
      ]
    },
    {
      label: 'Price Offers',
      items: [
        { label: "For Facility", items: [
          { label: 'Price Offers', routerLink: '/facility-price-offer' },
          { label: 'Price Offer Details', routerLink: '/price-offer-details/18' },
        ] },
        { label: "For Company", items: [
          { label: 'Company Price Offers', routerLink: '/company-price-offer'},
          { label: 'Create Price Offer', routerLink: 'create-price-offer/68' },
          { label: 'Update Price Offer', routerLink: 'update-price-offer/24' },
          { label: 'Price Offer Details', routerLink: 'price-offer-details/24' },
        ] },
      ]
    },
    {
      label: 'Contract',
      items: [
        { label: 'Contract Form', routerLink: '/contract-form/18' },
        { label: 'Contract Preview', routerLink: '/contract-preview/18' },
      ]
    },
  ];
}

