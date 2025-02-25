import { Component, inject, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PriceOffersService } from '../../services/price-offers.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { IGetPriceOfferById } from '../../models/iget-price-offer-by-id';
import { TooltipModule } from 'primeng/tooltip';
import { DeletePopupComponent } from '../../../../shared/components/delete-popup/delete-popup.component';
import { IPriceOfferService } from '../../models/iprice-offer-service';
import { IPriceOfferOtherService } from '../../models/iprice-offer-other-service';
import { HasPermissionDirective } from '../../../../core/directives/has-permission.directive';

@Component({
  selector: 'app-company-offers',
  standalone: true,
  imports: [ IconFieldModule, TooltipModule, InputTextModule, InputIconModule, ButtonModule, TableModule, ToastModule, FormsModule, TranslatePipe, RouterModule, DeletePopupComponent, HasPermissionDirective],
  templateUrl: './company-offers.component.html',
  styleUrl: './company-offers.component.scss'
})
export class CompanyOffersComponent implements OnInit {
  private priceOffersService = inject(PriceOffersService);
  private toastr = inject(ToastrService);
  priceOffers: IGetPriceOfferById[] = [];
  searchTerm = '';
  currentId = 0;
  showCancelPopUp = false;
  showHidePopUp = false;

  ngOnInit(): void {
    this.getPrices();
  }
  getPrices(): void {
    this.priceOffersService.getMyCompanyOffers().subscribe(res => {
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
  cancelOffer(){
    this.showCancelPopUp = false;
    this.priceOffersService.cancel(this.currentId).subscribe(()=>{this.getPrices();})
  }
  hideOffer(){
    this.showHidePopUp = false;
    this.priceOffersService.hide(this.currentId).subscribe(()=>{this.getPrices();})
  }

  toggleActions(service: IGetPriceOfferById) {
    service.showActions = !service.showActions;
  }
}
