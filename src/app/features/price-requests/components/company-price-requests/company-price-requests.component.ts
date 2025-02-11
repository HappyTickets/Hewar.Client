import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TranslatePipe } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { IPriceOffer } from '../../../my-offers/models/iprice-offer';
import { ICompanyPriceRequest } from '../../models/icompany-price-request';
import { PriceRequestsService } from '../../services/price-requests.service';

@Component({
  selector: 'app-company-price-requests',
  standalone: true,
  imports: [ CommonModule, IconFieldModule, InputTextModule, InputIconModule, ButtonModule, TableModule, InputNumberModule, FormsModule, TranslatePipe, RouterModule ],
  templateUrl: './company-price-requests.component.html',
  styleUrl: './company-price-requests.component.scss',
})
export class CompanyPriceRequestsComponent implements OnInit {
  private priceRequestsService = inject(PriceRequestsService);
  private toastr = inject(ToastrService);
  priceRequests: ICompanyPriceRequest[] = [];
  priceOffers: IPriceOffer[] = [];
  searchTerm = '';

  ngOnInit(): void {
    this.getPrices();
  }

  getPrices(): void {
    this.priceRequestsService.getMyCompanyRequests().subscribe((res) => {
      if (res.data) this.priceRequests = res.data;
      console.log(res.data);

    });
  }

  openChat(): void {
    this.toastr.info('Chat feature is coming soon!', 'Coming Soon');
  }

  hide(id: number) {
    this.priceRequestsService.hide(id).subscribe(() => {
      this.getPrices();
    });
  }
}
