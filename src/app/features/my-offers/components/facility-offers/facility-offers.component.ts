import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { IGetPriceOffersByRequest } from '../../models/iprice-offer';
import { PriceOffersService } from '../../services/price-offers.service';

@Component({
  selector: 'app-facility-offers',
  standalone: true,
  imports: [ CommonModule, IconFieldModule, InputTextModule, InputIconModule, ButtonModule, TableModule, DialogModule, ToastModule, InputNumberModule, FormsModule, TranslatePipe, RouterModule],
  templateUrl: './facility-offers.component.html',
  styleUrl: './facility-offers.component.scss'
})
export class FacilityOffersComponent implements OnInit {
  private priceOffersService = inject(PriceOffersService);
  private toastr = inject(ToastrService);
  priceOffers: IGetPriceOffersByRequest[] = [];
  searchTerm = '';

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
  getTotalDailyCost(services: {dailyCostPerUnit:number, quantity:number}[]): number {
    return services.reduce((total, service) => {
      return total + (service.dailyCostPerUnit * service.quantity);
    }, 0);
  }
  getTotalMonthlyCost(services: {monthlyCostPerUnit:number, quantity:number}[]): number {
    return services.reduce((total, service) => {
      return total + (service.monthlyCostPerUnit * service.quantity);
    }, 0);
  }
  acceptOffer(id: number){
    this.priceOffersService.accept(id).subscribe(()=>{this.getPrices();})
  }
  rejectOffer(id: number){
    this.priceOffersService.reject(id).subscribe(()=>{this.getPrices();})
  }
  hideOffer(id: number){
    this.priceOffersService.hide(id).subscribe(()=>{this.getPrices();})
  }
}
