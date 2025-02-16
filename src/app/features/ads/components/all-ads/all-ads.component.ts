import { Component, inject, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { AdsService } from '../../services/ads.service';
// import { Observable } from 'rxjs';
// import { IResponse } from '../../../insurance-ads/model/IResponsive';
import { ICreateAd } from '../../models/icreate-ad';
import { CommonModule, DatePipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-ads',
  standalone: true,
  imports: [
    CardModule,
    ButtonModule,
    ConfirmDialogModule,
    CommonModule,
    TranslatePipe,
    FormsModule,
    DatePipe,
  ],
  templateUrl: './all-ads.component.html',
  styleUrl: './all-ads.component.scss',
})
export class AllAdsComponent implements OnInit {
  private adsService = inject(AdsService);
  private router = inject(Router);
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

  deleteAd(id: number): void {
    this.adsService.deleteAd(id).subscribe({
      next: () => {
        console.log();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  editAd(id: number | undefined) {
    this.router.navigate(['/ads/edit', id]);
  }
}
