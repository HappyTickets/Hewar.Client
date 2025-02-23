import { Component, Input } from '@angular/core';
import { IPriceOfferService } from '../../../price-offers/models/iprice-offer-service';
import { IPriceOfferOtherService } from '../../../price-offers/models/iprice-offer-other-service';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-contract-dispay-service',
  standalone: true,
  imports: [TableModule, CommonModule, TranslatePipe],
  templateUrl: './contract-dispay-service.component.html',
  styleUrl: './contract-dispay-service.component.scss',
})
export class ContractDispayServiceComponent {
  @Input() services: IPriceOfferService[] = [];
  @Input() otherServices: IPriceOfferOtherService[] = [];

  getTotalDailyCost(services: IPriceOfferService[], otherServices: IPriceOfferOtherService[]): number {
    let total = 0;
    total += services.reduce((acc, service) => {return acc + (service.dailyCostPerUnit * service.quantity);}, 0);
    total += otherServices.reduce((acc, service) => {return acc + (service.dailyCostPerUnit * service.quantity);}, 0);
    return total
  }

  getTotalMonthlyCost(services: IPriceOfferService[], otherServices: IPriceOfferOtherService[]): number {
    let total = 0;
    total += services.reduce((acc, service) => {return acc + (service.monthlyCostPerUnit * service.quantity);}, 0);
    total += otherServices.reduce((acc, service) => {return acc + (service.monthlyCostPerUnit * service.quantity);}, 0);
    return total
  }
}
