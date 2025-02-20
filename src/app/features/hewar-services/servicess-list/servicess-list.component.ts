import { Component, OnInit } from '@angular/core';
import { HewarServicesComponent } from '../hewar-services.component';
import { HewarServicesService } from '../services/hewar-services.service';
import { IResponse } from '../models/iresponse';
import { IUpdate } from '../models/iupdate';
import { TableModule } from 'primeng/table';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DeletePopupComponent } from '../../../shared/components/delete-popup/delete-popup.component';
import { IResponseData } from '../../facilities/models/iresponse-data';
import { Icreate } from '../models/icreate';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}

@Component({
  selector: 'app-servicess-list',
  standalone: true,
  imports: [
    TableModule,
    ButtonModule,
    DeletePopupComponent,
    CommonModule,
    PaginatorModule,
    TranslateModule,
  ],
  templateUrl: './servicess-list.component.html',
  styleUrl: './servicess-list.component.scss',
})
export class ServicessListComponent implements OnInit {
  first = 0;
  rows = 5;
  totalRecords = 0;
  paginatedServices: any[] = []; // Displayed services per page
  loading = true;
  AllServices!: IUpdate[];
  selectedService: IUpdate | null = null; // ✅ Track only the selected service

  constructor(
    private HewarService: HewarServicesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadServices();
  }

  loadServices() {
    this.loading = true;
    this.HewarService.getAllServices().subscribe((response) => {
      this.AllServices = response.data; // Store all services
      this.totalRecords = this.AllServices.length;
      this.updatePaginatedServices();
      this.loading = false;
    });
  }

  onUpdate(service: IUpdate): void {
    this.router.navigate(['/update-hewar-service', service.id]);
  }

  add() {
    this.router.navigate(['/creat-hewar-service']);
  }

  openDeletePopup(service: IUpdate) {
    this.selectedService = service; // ✅ Ensure correct service is selected
  }

  deleteFacility() {
    if (!this.selectedService) return; // Prevent deleting if no service selected

    this.HewarService.deleteService(this.selectedService.id).subscribe({
      next: () => {
        this.selectedService = null; // ✅ Close popup
        this.loadServices(); // ✅ Refresh list after delete
      },
      error: (err) => {
        console.error('Delete error:', err);
      },
    });
  }

  onPageChange(event: PaginatorState) {
    this.first = event.first ?? 0;
    this.rows = event.rows ?? 10;
    this.updatePaginatedServices();
  }

  updatePaginatedServices() {
    this.paginatedServices = this.AllServices.slice(
      this.first,
      this.first + this.rows
    );
  }
}
