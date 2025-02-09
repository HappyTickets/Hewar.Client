import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { IFacilityPriceRequest } from '../../models/ifacility-price-request';
import { PriceRequestsService } from '../../services/price-requests.service';
import { CommonModule } from '@angular/common';
import { RequestStatus } from '../../../../shared/enums/request-status';
import { TranslatePipe } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-facility-price-requests',
  standalone: true,
  imports: [IconFieldModule, InputTextModule, InputIconModule, ButtonModule, TableModule, DialogModule, ToastModule, InputNumberModule, FormsModule, CommonModule, TranslatePipe, RouterModule],
  templateUrl: './facility-price-requests.component.html',
  styleUrl: './facility-price-requests.component.scss'
})
export class FacilityPriceRequestsComponent implements OnInit {
  private priceRequestsService = inject(PriceRequestsService);
  private toastr = inject(ToastrService);
  priceRequests: IFacilityPriceRequest[] = [];
  searchTerm = '';

  ngOnInit(): void {
    this.getPriceRequests()
  }

  getPriceRequests(): void {
    this.priceRequestsService.getMyFacilityRequests().subscribe(res => {
      if (res.data) {
        this.priceRequests = res.data.map((request) => ({ ...request, servicesNames: request.otherServices.map((s) => s.name).join(', '), status: this.getRequestStatusLabel(request.requestStatus), isEditMode: false }));
        console.log(res.data);
      }
    })
  }
  getRequestStatusLabel(status: RequestStatus): string {
    const statusLabels: Record<RequestStatus, string> = {
      [RequestStatus.Pending]: 'Pending',
      [RequestStatus.accepted]: 'Accepted',
      [RequestStatus.Rejected]: 'Rejected',
      [RequestStatus.Cancelled]: 'Cancelled',
      [RequestStatus.Completed]: 'Completed',
    };
    return statusLabels[status] || 'Unknown';
  }

  openChat(): void {
    this.toastr.info('Chat feature is coming soon!', 'Coming Soon');
  }

  editService(service: IFacilityPriceRequest): void {
    service.isEditMode = true;
  }

  cancelEdit(service: IFacilityPriceRequest): void {
    service.isEditMode = false;
  }

  isSubmitDisabled(service: IFacilityPriceRequest): boolean {
    return service.otherServices.some((service) => !service.monthlyCost || !service.dailyCost);
  }

  submitService(service: IFacilityPriceRequest): void {
    service.isEditMode = false;
    this.toastr.success('Service updated successfully!', 'Success');
  }

  cancelPriceRequest(id :number) {
    this.priceRequestsService.cancel(id).subscribe(res => {
      this.getPriceRequests();
      console.log(res);
    })
  }
}
