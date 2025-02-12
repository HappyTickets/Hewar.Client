import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TranslatePipe } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { ICompanyPriceRequest } from '../../models/icompany-price-request';
import { PriceRequestsService } from '../../services/price-requests.service';
import { TooltipModule } from 'primeng/tooltip';
import { DeletePopupComponent } from '../../../../shared/components/delete-popup/delete-popup.component';

@Component({
  selector: 'app-company-price-requests',
  standalone: true,
  imports: [ CommonModule, IconFieldModule,TooltipModule, InputTextModule, InputIconModule, ButtonModule, TableModule, FormsModule, TranslatePipe, RouterModule, DeletePopupComponent ],
  templateUrl: './company-price-requests.component.html',
  styleUrl: './company-price-requests.component.scss',
})
export class CompanyPriceRequestsComponent implements OnInit {
  private priceRequestsService = inject(PriceRequestsService);
  private toastr = inject(ToastrService);
  priceRequests: ICompanyPriceRequest[] = [];
  searchTerm = '';
  showHidePopUp = false;

  ngOnInit(): void {
    this.getPrices();
  }
  toggleActions(service: ICompanyPriceRequest) {
    service.showActions = !service.showActions;
  }

  getPrices(): void {
    this.priceRequestsService.getMyCompanyRequests().subscribe((res) => {
      if (res.data) this.priceRequests = res.data;
    });
  }

  openChat(): void {
    this.toastr.info('Chat feature is coming soon!', 'Coming Soon');
  }

  hide(id: number) {
    this.showHidePopUp = false;
    this.priceRequestsService.hide(id).subscribe(() => {
      this.getPrices();
    });
  }
}
