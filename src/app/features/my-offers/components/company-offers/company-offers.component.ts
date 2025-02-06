import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { IOffer, openedOffers } from '../../dummy-data';

@Component({
  standalone: true,
  imports: [CommonModule, IconFieldModule, InputTextModule, InputIconModule, ButtonModule, TableModule, DialogModule, ToastModule, InputNumberModule, FormsModule],
  selector: 'app-company-offers',
  templateUrl: './company-offers.component.html',
  styleUrl: './company-offers.component.scss'
})
export class CompanyOffersComponent {
  private toastr = inject(ToastrService);
  companyOffers = openedOffers;
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
    this.companyOffers = this.companyOffers.filter((o) => o.id !== offer.id);
    this.toastr.success('Offer deleted successfully!', 'Success');
  }
}
