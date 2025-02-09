import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { LocalizationService } from '../../../../core/services/localization/localization.service';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { ContractType } from '../../../../shared/enums/contract-type';
import { ShiftType } from '../../../../shared/enums/shift-type';
import { ICompany } from '../../../companies/models/ICompany';
import { CompaniesService } from '../../../companies/services/companies.service';
import { ICreatePriceReq } from '../../models/ICreatePriceReq';
import { PriceRequestsService } from '../../services/price-requests.service';
import { ICompanyService } from '../../../companies/models/i-company-service';
import { CompanyUtilitiesService } from '../../../companies/services/company-utilities.service';

@Component({
  selector: 'app-create-price-request',
  standalone: true,
  imports: [ SelectModule, InputNumberModule, TextareaModule, ButtonModule, DatePickerModule, ReactiveFormsModule, InputTextModule, TranslatePipe, InputComponent ],
  templateUrl: './create-price-request.component.html',
  styleUrl: './create-price-request.component.scss',
})
export class CreatePriceRequestComponent implements OnInit {
  private companyUtilities = inject(CompanyUtilitiesService);
  private companiesService = inject(CompaniesService);
  private localizationService = inject(LocalizationService);
  private priceRequestsService = inject(PriceRequestsService);
  private router = inject(Router);

  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);
  shiftType = this.localizationService.createDropdown(ShiftType);
  contractTypes = this.localizationService.createDropdown(ContractType);
  companyServices: ICompanyService[] = [];

  companyData: ICompany = {} as ICompany;
  createPriceRequestForm: FormGroup;
  date = new Date();
  loading = false;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const companyId = params.get('id');
      if (companyId) {
        this.companiesService.getCompanyById(companyId).subscribe((res) => {
          if (res.data) {
            this.companyData = res.data;
            this.getCompanyServices(this.companyData.id);
          }
        });
      }
    });
  }

  getCompanyServices(id: number) {
    this.companyUtilities.getServicesByCompanyId(id).subscribe((res) => {
      if (res.data) this.companyServices = res.data;
    });
  }
  constructor() {
    this.createPriceRequestForm = this.fb.group({
      contractType: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      notes: [''],
      services: this.fb.array([this.createServiceGroup()]),
      otherServices: this.fb.array([this.createOtherServiceGroup()]),
    });
  }
  onSubmit(): void {
    if (this.createPriceRequestForm.valid) {
      const priceRequest: ICreatePriceReq = {
        companyId: this.companyData.id,
        contractType: this.createPriceRequestForm.value.contractType,
        startDate: this.createPriceRequestForm.value.startDate,
        endDate: this.createPriceRequestForm.value.endDate,
        notes: this.createPriceRequestForm.value.notes,
        services: this.createPriceRequestForm.value.services,
        otherServices: this.createPriceRequestForm.value.otherServices,
      };
      this.priceRequestsService.create(priceRequest).subscribe(() => {
          this.router.navigate(['/facilities/price-request']);
        });
    }
  }
  createServiceGroup(): FormGroup {
    return this.fb.group({
      serviceId: [null, [Validators.required]],
      quantity: [null, [Validators.required]],
      shiftType: ['', [Validators.required]],
    });
  }
  createOtherServiceGroup(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required]],
      quantity: [null, [Validators.required]],
      shiftType: ['', [Validators.required]],
    });
  }
  get services() {
    return this.createPriceRequestForm.get('services') as FormArray;
  }
  get otherServices() {
    return this.createPriceRequestForm.get('otherServices') as FormArray;
  }
  addService(): void {
    this.services.push(this.createServiceGroup());
  }
  removeService(index: number): void {
    if (this.services.length > 0) {
      this.services.removeAt(index);
    }
  }
  addOtherService(): void {
    this.otherServices.push(this.createOtherServiceGroup());
  }
  removeOtherService(index: number): void {
    if (this.otherServices.length > 0) {
      this.otherServices.removeAt(index);
    }
  }
  onCancel(): void {
    this.createPriceRequestForm.reset();
  }
}
