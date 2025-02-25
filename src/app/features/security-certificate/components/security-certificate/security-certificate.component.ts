import { Component, inject, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { IEditSecurityCertificate } from '../../models/iedit-security-certificate';
import { ISecurityCertificate } from '../../models/isecurity-certificate';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SecurityCertificateService } from '../../services/security-certificate.service';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'primeng/tooltip';
import { TranslatePipe } from '@ngx-translate/core';
import { CheckboxModule } from 'primeng/checkbox';
import { DatePickerModule } from 'primeng/datepicker';
import { InputNumberModule } from 'primeng/inputnumber';
import { HasPermissionDirective } from '../../../../core/directives/has-permission.directive';
import { StorageService } from '../../../auth/services/storage.service';

@Component({
  selector: 'app-security-certificate',
  standalone: true,
  imports: [ToastModule, ConfirmDialogModule, TableModule, ButtonModule, DialogModule, ReactiveFormsModule, InputTextModule, CommonModule, TooltipModule, TranslatePipe, FormsModule, CheckboxModule, DatePickerModule, InputNumberModule, HasPermissionDirective],
  templateUrl: './security-certificate.component.html',
  styleUrl: './security-certificate.component.scss',
  providers: [MessageService, ConfirmationService]
})
export class SecurityCertificateComponent implements OnInit {
  private certificateService = inject(SecurityCertificateService);
  private storageService = inject(StorageService);
  private confirmationService = inject(ConfirmationService);
  fb = inject(FormBuilder);

  certificates: ISecurityCertificate[] = [];
  selectedCertificate: ISecurityCertificate | null = null;
  displayDialog = false;
  certificateForm: FormGroup;
  searchTerm = '';

  constructor() {
    this.certificateForm = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      siteArea: [null, Validators.required],
      agreedNumberOfSecurityGuards: [null, Validators.required],
      numberOfCameras: [null, Validators.required],
      hasCentralMonitoringRoom: [false],
      contractDocumentUrl: [''],
      address: this.fb.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        country: ['', Validators.required],
        postalCode: ['', Validators.required]
      })
    });
  }

  ngOnInit() {
    this.loadCertificates();
  }

  loadCertificates() {
    const id = this.storageService.getId();
    if (id) {
      this.certificateService.getByFacilityId(+id).subscribe(res => {
        if (res.data) this.certificates = res.data;
      });
    } else {
      this.certificateService.getAll().subscribe(res => {
        if (res.data) this.certificates = res.data;
      });
    }
  }

  editCertificate(cert: ISecurityCertificate) {
    this.selectedCertificate = cert;
    this.certificateForm.patchValue(cert);
    this.certificateForm.patchValue({
      startDate: new Date(cert.startDate),
      endDate: new Date(cert.endDate),
    });
    this.displayDialog = true;
    console.log(cert);
  }

  saveCertificate() {
    const data: IEditSecurityCertificate = this.certificateForm.value;

    if (this.selectedCertificate) {
      data.id = this.selectedCertificate.id;
      this.certificateService.update(data).subscribe(() => {
        this.loadCertificates();
        this.displayDialog = false;
      });
    } else {
      this.certificateService.create(data).subscribe(() => {
        this.loadCertificates();
        this.displayDialog = false;
      });
    }
  }

  confirmDelete(id: number) {
    this.confirmationService.confirm({
      accept: () => {
        this.deleteCertificate(id);
      }
    });
  }

  deleteCertificate(id: number) {
    this.certificateService.delete(id).subscribe(() => {
      this.loadCertificates();
    });
  }

  approve(id: number) {
    this.certificateService.approve(id).subscribe(() => {
      this.loadCertificates();
    });
  }

  reject(id: number) {
    this.certificateService.reject(id).subscribe(() => {
      this.loadCertificates();
    });
  }

  openAddDialog() {
    this.certificateForm.reset();
    this.displayDialog = true;
  }

  toggleActions(service: ISecurityCertificate) {
    service.showActions = !service.showActions;
  }
}
