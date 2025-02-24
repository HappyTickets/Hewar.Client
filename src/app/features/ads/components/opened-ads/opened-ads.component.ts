import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { TreeTableModule } from 'primeng/treetable';
import { DeletePopupComponent } from '../../../../shared/components/delete-popup/delete-popup.component';
import { AdsService } from '../../services/ads.service';
import { ICreateAd } from '../../models/icreate-ad';

@Component({
  selector: 'app-opened-ads',
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
        TreeTableModule,
        PanelModule,
  ],
  templateUrl: './opened-ads.component.html',
  styleUrl: './opened-ads.component.scss'
})
export class OpenedAdsComponent {
    private adsService = inject(AdsService);
    private router = inject(Router);
    myAds: ICreateAd[] = [];
    search = '';
    visible = false;
    selectedAdId: number | null = null;
    adType: string = 'myAds';
  
    ngOnInit(): void {
      this.gitMyAds();
    }
  
    gitMyAds(): void {
      this.adsService.getOpenedAds().subscribe({
        next: (data) => {
          if (data.data) this.myAds = data.data;
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  
    
  
    
  
    onCancelDelete(): void {
      this.visible = false;
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
