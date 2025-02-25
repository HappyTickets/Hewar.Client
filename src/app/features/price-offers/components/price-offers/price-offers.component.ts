import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { HasPermissionDirective } from '../../../../core/directives/has-permission.directive';
import { DeletePopupComponent } from '../../../../shared/components/delete-popup/delete-popup.component';
import { IGetPriceOfferById } from '../../models/iget-price-offer-by-id';
import { IPriceOfferOtherService } from '../../models/iprice-offer-other-service';
import { IPriceOfferService } from '../../models/iprice-offer-service';
import { PriceOffersService } from '../../services/price-offers.service';
import { StorageService } from '../../../auth/services/storage.service';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';

@Component({
  selector: 'app-price-offers',
  standalone: true,
  imports: [ CommonModule, IconFieldModule, PaginatorModule, InputTextModule, InputIconModule, ButtonModule, TableModule, TooltipModule, ToastModule, FormsModule, TranslatePipe, RouterModule, DeletePopupComponent, HasPermissionDirective],
  templateUrl: './price-offers.component.html',
  styleUrl: './price-offers.component.scss'
})
export class PriceOffersComponent implements OnInit {
  private priceOffersService = inject(PriceOffersService);
  private storageService = inject(StorageService);
  private toastr = inject(ToastrService);
  priceOffers: IGetPriceOfferById[] = [];
  type: 'Company' | "Facility" | null = null;
  searchTerm = '';

  // Pagination
  pageNumber = 1;
  pageSize = 5;
  totalPages = 0;

  currentId = 0;
  showAcceptPopUp = false;
  showHidePopUp = false;
  showRejectPopUp = false;
  showCancelPopUp = false;

  ngOnInit(): void {
    this.getPrices();
  }
  getPrices(): void {
    const role = this.storageService.getUserRole();
    if (role && role === 'Facility') {
      this.priceOffersService.getMyFacilityOffers(this.pageNumber, this.pageSize).subscribe(res => {
        if (res.data?.items) {
          this.priceOffers = res.data.items;
          this.totalPages = res.data.totalPages * this.pageSize; // Calculate total items
        } else {
          this.priceOffers = [];
          this.totalPages = 0;
        }
        this.type = "Facility";
      });
    } else if (role && role === 'Company') {
      this.priceOffersService.getMyCompanyOffers(this.pageNumber, this.pageSize).subscribe(res => {
        if (res.data?.items) {
          this.priceOffers = res.data.items;
          this.totalPages = res.data.totalPages * this.pageSize;
        } else {
          this.priceOffers = [];
          this.totalPages = 0;
        }
        this.type = "Company";
      });
    }
  }

  openChat(): void {
    this.toastr.info('Chat feature is coming soon!', 'Coming Soon');
  }
  getTotalDailyCost(services: IPriceOfferService[], otherServices: IPriceOfferOtherService[]): number {
    let total = 0;
    total += services.reduce((acc, service) => {
      return acc + (service.dailyCostPerUnit * service.quantity);
    }, 0);
    total += otherServices.reduce((acc, service) => {
      return acc + (service.dailyCostPerUnit * service.quantity);
    }, 0);
    return total
  }
  getTotalMonthlyCost(services: IPriceOfferService[], otherServices: IPriceOfferOtherService[]): number {
    let total = 0;
    total += services.reduce((acc, service) => {
      return acc + (service.monthlyCostPerUnit * service.quantity);
    }, 0);
    total += otherServices.reduce((acc, service) => {
      return acc + (service.monthlyCostPerUnit * service.quantity);
    }, 0);
    return total
  }
  acceptOffer(){
    this.showAcceptPopUp = false;
    this.priceOffersService.accept(this.currentId).subscribe(()=>{
      this.getPrices();
    })
  }
  rejectOffer(){
    this.showRejectPopUp = false;
    this.priceOffersService.reject(this.currentId).subscribe(()=>{this.getPrices();})
  }
  hideOffer(){
    this.showHidePopUp = false;
    this.priceOffersService.hide(this.currentId).subscribe(()=>{this.getPrices();})
  }
  cancelOffer(){
    this.showCancelPopUp = false;
    this.priceOffersService.cancel(this.currentId).subscribe(()=>{this.getPrices();})
  }
  toggleActions(service: IGetPriceOfferById) {
    service.showActions = !service.showActions;
  }
  onPageChange(event: PaginatorState): void {
    this.pageNumber = (event.page ?? 0) + 1;
    this.pageSize = event.rows ?? 10;
    this.getPrices();
  }

}
