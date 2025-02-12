import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { IFacilityPriceRequest } from '../../models/ifacility-price-request';
import { PriceRequestsService } from '../../services/price-requests.service';
import { TranslatePipe } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { TooltipModule } from 'primeng/tooltip';
import { DeletePopupComponent } from '../../../../shared/components/delete-popup/delete-popup.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-facility-price-requests',
  standalone: true,
  imports: [IconFieldModule, ButtonModule, InputTextModule, InputIconModule, TooltipModule, ButtonModule, TableModule, ToastModule, InputNumberModule, FormsModule, TranslatePipe, RouterModule, DeletePopupComponent, CommonModule],
  templateUrl: './facility-price-requests.component.html',
  styleUrl: './facility-price-requests.component.scss'
})
export class FacilityPriceRequestsComponent implements OnInit {
  private priceRequestsService = inject(PriceRequestsService);
  private toastr = inject(ToastrService);
  priceRequests: IFacilityPriceRequest[] = [];
  searchTerm = '';
  showCancelPopUp = false;
  showHidePopUp = false;
  currentId = 0;

  ngOnInit(): void {
    this.getPriceRequests()
  }

  getPriceRequests(): void {
    this.priceRequestsService.getMyFacilityRequests().subscribe(res => {
      if (res.data) {
        this.priceRequests = res.data;
      }
    })
  }

  openChat(): void {
    this.toastr.info('Chat feature is coming soon!', 'Coming Soon');
  }
  cancelPriceRequest() {
    this.showCancelPopUp = false;
    this.priceRequestsService.cancel(this.currentId).subscribe(() => {
      this.getPriceRequests();
    })
  }
  hidePriceRequest() {
    this.showHidePopUp = false;
    this.priceRequestsService.hide(this.currentId).subscribe(() => {
      this.getPriceRequests();
    })
  }
  toggleActions(service: IFacilityPriceRequest) {
    service.showActions = !service.showActions;
  }
}
