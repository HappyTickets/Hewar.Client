import { Component, OnInit } from '@angular/core';
import { FacilitiesService } from './services/facilities.service';
import { ICreateFacilities } from './models/icreate-facilities';
import { IResponseFacilities } from './models/iresponse-facilities';
import { IUpdateFacilities } from './models/iupdate-facilities';
import { CommonModule } from '@angular/common';
import { IResponseData } from './models/iresponse-data';
import { ListFacilityComponent } from './list-facility/list-facility.component';

@Component({
  selector: 'app-facilities',
  templateUrl: './facilities.component.html',
  standalone: true,
  imports: [CommonModule, ListFacilityComponent],
  styleUrls: ['./facilities.component.scss'],
})
export class FacilitiesComponent implements OnInit {
  // constructor() {}
  allfacilities: IResponseData[] = []; // Define an array to store facilities

  ngOnInit(): void {
    // Test: Get all facilities
  }
}
