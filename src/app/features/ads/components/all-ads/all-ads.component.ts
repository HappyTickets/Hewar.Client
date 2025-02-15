import { Component, inject, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { AdsService } from '../../services/ads.service';
// import { Observable } from 'rxjs';
// import { IResponse } from '../../../insurance-ads/model/IResponsive';
import { ICreateAd } from '../../models/icreate-ad';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-all-ads',
  standalone: true,
  imports: [CardModule, ButtonModule, ConfirmDialogModule, CommonModule],
  templateUrl: './all-ads.component.html',
  styleUrl: './all-ads.component.scss',
})
export class AllAdsComponent implements OnInit {
  private adsService = inject(AdsService);

  myAds: ICreateAd[] = [];

  // ads$ : Observable<IResponse<ICreateAd[]>> = this.adsService.getMyAds()

  ngOnInit(): void {
    this.gitMyAds();
  }

  gitMyAds(): void {
    this.adsService.getMyAds().subscribe({
      next: (data) => {
        this.myAds = data.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
