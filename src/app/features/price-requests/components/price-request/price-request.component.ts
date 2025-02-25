import { Component, inject, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PriceRequestsService } from '../../services/price-requests.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { HasPermissionDirective } from '../../../../core/directives/has-permission.directive';
import { DeletePopupComponent } from '../../../../shared/components/delete-popup/delete-popup.component';
import { IPriceRequest } from '../../models/iprice-request';
import { StorageService } from '../../../auth/services/storage.service';

@Component({
  selector: 'app-price-request',
  standalone: true,
  imports: [IconFieldModule, HasPermissionDirective, ButtonModule, InputTextModule, InputIconModule, TooltipModule, ButtonModule, TableModule, ToastModule, InputNumberModule, FormsModule, TranslatePipe, RouterModule, DeletePopupComponent, CommonModule],
  templateUrl: './price-request.component.html',
  styleUrl: './price-request.component.scss'
})
export class PriceRequestComponent implements OnInit {
  private priceRequestsService = inject(PriceRequestsService);
  private storageService = inject(StorageService);
  private toastr = inject(ToastrService);
  priceRequests: IPriceRequest[] = [];
  searchTerm = '';
  type: 'Company' | "Facility" | null = null;
  showCancelPopUp = false;
  showHidePopUp = false;
  currentId = 0;

  ngOnInit(): void {
    this.getPriceRequests()
  }
  getPriceRequests(): void {
    if (this.storageService.getUserRole() && this.storageService.getUserRole() === 'Facility') {
      this.priceRequestsService.getMyFacilityRequests().subscribe(res => {
        if (res.data) {
          this.priceRequests = res.data;
          this.type = "Facility";
        }
      })
    } else if (this.storageService.getUserRole() && this.storageService.getUserRole() === 'Company') {
      this.priceRequestsService.getMyCompanyRequests().subscribe((res) => {
        if (res.data) this.priceRequests = res.data;
        this.type = "Company";
      });
    }
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
  toggleActions(service: IPriceRequest) {
    service.showActions = !service.showActions;
  }
}
