import { Component, inject, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IPriceOffer } from '../../models/iprice-offer';
import { PriceOffersService } from '../../services/price-offers.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-company-offers',
  standalone: true,
  imports: [ CommonModule, IconFieldModule, InputTextModule, InputIconModule, ButtonModule, TableModule, DialogModule, ToastModule, InputNumberModule, FormsModule, TranslatePipe, RouterModule],
  templateUrl: './company-offers.component.html',
  styleUrl: './company-offers.component.scss'
})
export class CompanyOffersComponent implements OnInit {
  private priceOffersService = inject(PriceOffersService);
  private toastr = inject(ToastrService);
  priceOffers: IPriceOffer[] = [];
  searchTerm = '';

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
  cancelOffer(id: number){
    this.priceOffersService.cancel(id).subscribe(()=>{this.getPrices();})
  }
  hideOffer(id: number){
    this.priceOffersService.hide(id).subscribe(()=>{this.getPrices();})
  }
}
