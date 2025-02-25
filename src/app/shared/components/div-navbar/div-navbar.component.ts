import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { Menubar } from 'primeng/menubar';
@Component({
  selector: 'app-div-navbar',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    RouterModule,
    Menubar,
  ],
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
      ],
    },
    {
      label: 'Companies',
      items: [
        { label: 'All Companies', routerLink: '/companies' },
        { label: 'Create Companies', routerLink: '/companies/createCompany' },
        {
          label: 'Update Companies',
          routerLink: '/companies/updateCompany/17',
        },
        {
          label: 'Company Details',
          routerLink: '/companies/companyDetails/17',
        },
      ],
    },
    {
      label: 'Price Requests',
      items: [
        {
          label: 'Price Requests',
          routerLink: '/price-requests',
        },
        {
          label: 'For Company',
          items: [
            {
              label: 'Company Price Request',
              routerLink: '/company-price-request',
            },
          ],
        },
        {
          label: 'For Facility',
          items: [
            {
              label: 'Facility Price Request',
              routerLink: '/facility-price-request',
            },
            {
              label: 'Create Price Request',
              routerLink: 'create-price-request/25',
            },
            {
              label: 'Update Price Request',
              routerLink: 'update-price-request/90',
            },
            {
              label: 'Price Request Details',
              routerLink: 'price-request-details/90',
            },
          ],
        },
      ],
    },
    {
      label: 'Price Offers',
      items: [
        {
          label: 'Price Offers',
          routerLink: '/price-offers',
        },
        {
          label: 'For Facility',
          items: [
            { label: 'Price Offers', routerLink: '/facility-price-offer' },
            {
              label: 'Price Offer Details',
              routerLink: '/price-offer-details/18',
            },
          ],
        },
        {
          label: 'For Company',
          items: [
            {
              label: 'Company Price Offers',
              routerLink: '/company-price-offer',
            },
            {
              label: 'Create Price Offer',
              routerLink: 'create-price-offer/91',
            },
            {
              label: 'Update Price Offer',
              routerLink: 'update-price-offer/32',
            },
            {
              label: 'Price Offer Details',
              routerLink: 'price-offer-details/32',
            },
          ],
        },
      ],
    },
    {
      label: 'Contract',
      items: [
        { label: 'Create Contract Form', routerLink: '/create-contract/35' },
        { label: 'Update Contract Form', routerLink: '/update-contract/35' },
        { label: 'Contract Preview', routerLink: '/contract-preview/35' },
      ],
    },
    {
      label: 'Security Certificate',
      routerLink: '/security-certificate',
    },
    {
      label: 'companyservices',
      items: [
        { label: 'Company Services', routerLink: '/companyservices' },
        {
          label: 'update-company-services',
          routerLink: '/update-company-services/21',
        },
        {
          label: 'create-company-services',
          routerLink: '/create-company-service',
        },
      ],
    },
    {
      label: 'Hewar Service',
      items: [
        { label: 'Hewar Services', routerLink: '/get-all-hewar-services' },
        { label: 'Create Hewar Service', routerLink: '/creat-hewar-service' },
        {
          label: 'Update Hewar Service',
          routerLink: '/update-hewar-service/1',
        },
      ],
    },
    {
      label: 'ads',
      items: [
        { label: 'ads', routerLink: '/ads' },
        { label: 'createAds', routerLink: '/createAds' },
      ],
    },
  ];
}
