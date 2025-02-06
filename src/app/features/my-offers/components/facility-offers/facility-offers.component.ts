import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { ToastrService } from 'ngx-toastr';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { IOffer, securityOffers } from '../../dummy-data';

@Component({
  selector: 'app-facility-offers',
  standalone: true,
  imports: [DataViewModule, IconFieldModule, InputTextModule, InputIconModule, ButtonModule, TableModule, DialogModule, MatTabsModule, ToastModule, InputNumberModule, FormsModule],
  templateUrl: './facility-offers.component.html',
  styleUrl: './facility-offers.component.scss'
})
export class FacilityOffersComponent {
  private toastr = inject(ToastrService);
  securityOffers = securityOffers;
  searchTerm = '';

  openChat(): void {
    this.toastr.info('Chat feature is coming soon!', 'Coming Soon');
  }

  editOffer(offer: IOffer): void {
    offer.isEditMode = true;
  }

  cancelEdit(offer: IOffer): void {
    offer.isEditMode = false;
  }

  isSubmitDisabled(offer: IOffer): boolean {
    return offer.services.some((service) => !service.monthlyCost || !service.dailyCost);
  }

  submitOffer(offer: IOffer): void {
    offer.isEditMode = false;
    this.toastr.success('Offer updated successfully!', 'Success');
  }

  deleteOffer(offer: IOffer): void {
    this.securityOffers = this.securityOffers.filter((o) => o.id !== offer.id);
    this.toastr.success('Offer deleted successfully!', 'Success');
  }
}

