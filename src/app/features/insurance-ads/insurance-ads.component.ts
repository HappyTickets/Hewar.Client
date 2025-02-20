import { Component, inject, OnInit } from '@angular/core';
import { InsuranceAdsService } from './services/insurance-ads.service';
import { ICreateAd } from './model/ICreateAd';
import { FacilitiesComponent } from '../facilities/facilities.component';

@Component({
  selector: 'app-insurance-ads',
  standalone: true,
  imports: [],
  templateUrl: './insurance-ads.component.html',
  styleUrl: './insurance-ads.component.scss',
})
export class InsuranceAdsComponent implements OnInit {
  _insuranceAdsService = inject(InsuranceAdsService);
  ngOnInit() {
    const data: ICreateAd = {
      securityRole: 1,
      guardsCount: 1,
      workShift: 2,
      contractType: 2,
      startDate: '2025-01-19T12:46:20.874Z',
      endDate: '2025-01-19T12:46:20.874Z',
      description: 'string',
      status: 1,
    };
    this._insuranceAdsService.createAd(data).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
