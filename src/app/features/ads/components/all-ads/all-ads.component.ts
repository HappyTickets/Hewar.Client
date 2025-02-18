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
import { Router, RouterModule } from '@angular/router';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { DeletePopupComponent } from '../../../../shared/components/delete-popup/delete-popup.component';
import { TreeTableModule } from 'primeng/treetable';
import { PanelModule } from 'primeng/panel';

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
    CommonModule,
    IconFieldModule,
    TooltipModule,
    InputTextModule,
    InputIconModule,
    ButtonModule,
    TableModule,
    FormsModule,
    TranslatePipe,
    RouterModule,
    DeletePopupComponent,
    TreeTableModule,
    PanelModule,
  ],
  templateUrl: './all-ads.component.html',
  styleUrl: './all-ads.component.scss',
})
export class AllAdsComponent implements OnInit {
  private adsService = inject(AdsService);
  private router = inject(Router);
  myAds: ICreateAd[] = [];
  search = '';

  // ads$ : Observable<IResponse<ICreateAd[]>> = this.adsService.getMyAds()

  ngOnInit(): void {
    this.gitMyAds();
  }

  gitMyAds(): void {
    this.adsService.getMyAds().subscribe({
      next: (data) => {
       if(data.data) this.myAds = data.data;
       console.log(data.data);

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
  toggleActions(ad: ICreateAd) {
    ad.showActions = !ad.showActions;
  }

  editAd(id: number | undefined) {
    this.router.navigate(['/ads/edit', id]);
  }

  details(id: number) {
    this.router.navigate(['/ad', id], { queryParams: { mode: 'details' } });
  }
}
