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
import { PriceOffersService } from '../../services/price-offers.service';
import { IGetPriceOfferById } from '../../models/iget-price-offer-by-id';
import { TooltipModule } from 'primeng/tooltip';
import { DeletePopupComponent } from '../../../../shared/components/delete-popup/delete-popup.component';
import { IPriceOfferService } from '../../models/iprice-offer-service';
import { IPriceOfferOtherService } from '../../models/iprice-offer-other-service';

@Component({
  selector: 'app-facility-offers',
  standalone: true,
  imports: [ CommonModule, IconFieldModule, InputTextModule, InputIconModule, ButtonModule, TableModule, TooltipModule, ToastModule, FormsModule, TranslatePipe, RouterModule, DeletePopupComponent],
  templateUrl: './facility-offers.component.html',
  styleUrl: './facility-offers.component.scss'
})
export class FacilityOffersComponent implements OnInit {
  private priceOffersService = inject(PriceOffersService);
  private toastr = inject(ToastrService);
  priceOffers: IGetPriceOfferById[] = [];
  searchTerm = '';

  showAcceptPopUp = false;
  showHidePopUp = false;
  showRejectPopUp = false;
  ngOnInit(): void {
    this.getPrices();
  }
  getPrices(): void {
    this.priceOffersService.getMyFacilityOffers().subscribe(res => {
      if (res.data) this.priceOffers = res.data;
    })
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

  acceptOffer(id: number){
    this.showAcceptPopUp = false;
    this.priceOffersService.accept(id).subscribe(()=>{this.getPrices();})
  }
  rejectOffer(id: number){
    this.showRejectPopUp = false;
    this.priceOffersService.reject(id).subscribe(()=>{this.getPrices();})
  }
  hideOffer(id: number){
    this.showHidePopUp = false;
    this.priceOffersService.hide(id).subscribe(()=>{this.getPrices();})
  }
  toggleActions(service: IGetPriceOfferById) {
    service.showActions = !service.showActions;
  }
}
