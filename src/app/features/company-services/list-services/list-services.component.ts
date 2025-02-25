import { Component, OnInit } from '@angular/core';
import { DeletePopupComponent } from '../../../shared/components/delete-popup/delete-popup.component';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { IUpdate } from '../models/models/iupdate';
import { CompanyServicesService } from '../services/company-services.service';
import { Router, RouterModule } from '@angular/router';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { InputTextModule } from 'primeng/inputtext';
import { HasPermissionDirective } from '../../../core/directives/has-permission.directive';

@Component({
  selector: 'app-list-services',
  standalone: true,
  imports: [
    DeletePopupComponent,
    TableModule,
    ButtonModule,
    PaginatorModule,
    CommonModule,
    InputTextModule,
    TranslateModule,
    RouterModule,
    DeletePopupComponent,
    HasPermissionDirective
  ],
  templateUrl: './list-services.component.html',
  styleUrl: './list-services.component.scss',
})
export class ListServicesComponent implements OnInit {
  AllServices!: IUpdate[];
  visibleDeletePopup = false;
  showDeletePopup = false;
  currentCard!: IUpdate;
  first = 0;
  rows = 10;
  totalRecords = 0;
  paginatedServices: any[] = []; // Displayed services per page
  loading = true;

  selectedService: IUpdate | null = null; // ✅ Track only the selected service

  constructor(
    private companyServices: CompanyServicesService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.companyServices.getAllServices().subscribe((data) => {
      this.AllServices = data.data;
    });
    this.loadServices();
  }
  loadServices() {
    this.loading = true;
    this.companyServices.getAllServices().subscribe((response) => {
      this.AllServices = response.data; // Store all services
      this.totalRecords = this.AllServices.length;
      this.updatePaginatedServices();
      this.loading = false;
    });
  }
  onUpdate(service: IUpdate): void {
    this.router.navigate(['/update-company-services', service.id]);
  }
  openDeletePopup(service: IUpdate) {
    this.selectedService = service; // ✅ Ensure the correct service is selected
  }

  onPageChange(event: PaginatorState) {
    this.first = event.first ?? 0;
    this.rows = event.rows ?? 10;
    this.updatePaginatedServices();
  }
  deleteFacility() {
    if (!this.selectedService) return; // Prevent deleting if no service selected

    this.companyServices.deleteService(this.selectedService.id).subscribe({
      next: () => {
        this.selectedService = null; // ✅ Close popup
        this.loadServices(); // ✅ Refresh list after delete
      },
      error: (err) => {
        console.error('Delete error:', err);
      },
    });
  }

  updatePaginatedServices() {
    this.paginatedServices = this.AllServices.slice(
      this.first,
      this.first + this.rows
    );
  }
  add() {
    this.router.navigate(['/create-company-service']);
  }
}
