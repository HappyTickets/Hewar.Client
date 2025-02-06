import { Component, OnInit } from '@angular/core';
import { FacilitiesService } from './services/facilities.service';
import { ICreateFacilities } from './models/icreate-facilities';
import { IResponseFacilities } from './models/iresponse-facilities';
import { IUpdateFacilities } from './models/iupdate-facilities';
import { CommonModule } from '@angular/common';
import { IResponseData } from './models/iresponse-data';

@Component({
  selector: 'app-facilities',
  templateUrl: './facilities.component.html',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./facilities.component.scss'],
})
export class FacilitiesComponent implements OnInit {
  // constructor() {}
  allfacilities: IResponseData[] = []; // Define an array to store facilities

  ngOnInit(): void {
    // Test: Get all facilities

    let facilities: ICreateFacilities = {
      email: 'test@testT12.com',
      phone: '01010001010',
      password: '123123abcdA$',
      type: 'ee',
      name: 'ALI',
      imageUrl: 'stringddd',
      commercialRegistration: 'ddstring',
      activityType: 'string',
      address: 'TSTdd',
      city: 'TSTS',
      responsibleName: '1231231231233',
      responsiblePhone: '1231231233455544',
    };
  }
}
