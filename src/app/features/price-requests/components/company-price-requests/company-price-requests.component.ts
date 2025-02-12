import { CommonModule } from '@angular/common';
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
import { PriceRequestsService } from '../../services/price-requests.service';
import { ICompanyPriceRequest } from '../../models/icompany-price-request';
import { TranslatePipe } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { PriceOffersService } from '../../../my-offers/services/price-offers.service';
import { IPriceOffer } from '../../../my-offers/models/iprice-offer';

@Component({
  selector: 'app-company-price-requests',
  standalone: true,
  imports: [ CommonModule, IconFieldModule, InputTextModule, InputIconModule, ButtonModule, TableModule, DialogModule, ToastModule, InputNumberModule, FormsModule, TranslatePipe, RouterModule],
  templateUrl: './company-price-requests.component.html',
  styleUrl: './company-price-requests.component.scss'
})
export class CompanyPriceRequestsComponent implements OnInit {
  private priceRequestsService = inject(PriceRequestsService);
  private priceOffersService = inject(PriceOffersService);
  private toastr = inject(ToastrService);
  priceRequests: ICompanyPriceRequest[] = [];
  priceOffers: IPriceOffer[] = [];
  searchTerm = '';

  ngOnInit(): void {
    this.getPrices();
  }

  getPrices(): void {
    this.priceRequestsService.getMyCompanyRequests().subscribe(res => {
      if (res.data) {
        this.priceRequests = res.data;
      };
    })
  }


  openChat(): void {
    this.toastr.info('Chat feature is coming soon!', 'Coming Soon');
  }
  hide(id: number) {
    this.priceRequestsService.hide(id).subscribe(res => {
      console.log(res);
      this.getPrices();
    })
  }
  reject(id: number) {
    this.priceOffersService.reject(id).subscribe(res => {
      console.log(res);
      this.getPrices();
    })
  }
  accept(id: number) {
    this.priceOffersService.accept(id).subscribe(res => {
      console.log(res);
      this.getPrices();
    })
  }
}
