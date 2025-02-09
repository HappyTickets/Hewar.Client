import { Component, inject, OnInit } from '@angular/core';
import { CompanyUtilitiesService } from '../../../companies/services/company-utilities.service';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalizationService } from '../../../../core/services/localization/localization.service';
import { ContractType } from '../../../../shared/enums/contract-type';
import { ShiftType } from '../../../../shared/enums/shift-type';
import { ICompanyService } from '../../../companies/models/i-company-service';
import { ICompany } from '../../../companies/models/ICompany';
import { ICreatePriceReq } from '../../models/ICreatePriceReq';
import { PriceRequestsService } from '../../services/price-requests.service';
import { TranslatePipe } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { IPriceRequest } from '../../models/iprice-request';

@Component({
  selector: 'app-update-price-request',
  standalone: true,
  imports: [ SelectModule, InputNumberModule, TextareaModule, ButtonModule, DatePickerModule, ReactiveFormsModule, InputTextModule, TranslatePipe, InputComponent ],
  templateUrl: './update-price-request.component.html',
  styleUrl: './update-price-request.component.scss',
})
export class UpdatePriceRequestComponent implements OnInit {
  private companyUtilities = inject(CompanyUtilitiesService);
  private localizationService = inject(LocalizationService);
  private priceRequestsService = inject(PriceRequestsService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);

  shiftType = this.localizationService.createDropdown(ShiftType);
  contractTypes = this.localizationService.createDropdown(ContractType);
  companyServices: ICompanyService[] = [];

  companyData: ICompany = {} as ICompany;
  priceRequestData: IPriceRequest = {} as IPriceRequest;
  createPriceRequestForm: FormGroup;
  date = new Date();
  loading = false;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.priceRequestsService.getById(+id).subscribe((res) => {
          if (res.data) {
            this.priceRequestData = res.data;
            this.companyData = res.data.company;
            this.getCompanyServices(this.companyData.id);
            this.assignValues();
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
        priceRequestId: this.priceRequestData.id,
        contractType: this.createPriceRequestForm.value.contractType,
        startDate: this.createPriceRequestForm.value.startDate,
        endDate: this.createPriceRequestForm.value.endDate,
        notes: this.createPriceRequestForm.value.notes,
        services: this.createPriceRequestForm.value.services,
        otherServices: this.createPriceRequestForm.value.otherServices,
      };
      this.priceRequestsService.update(priceRequest).subscribe(() => {
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
  assignValues() {
    this.createPriceRequestForm.patchValue({
      contractType: this.priceRequestData.contractType,
      startDate: new Date(this.priceRequestData.startDate),
      endDate: new Date(this.priceRequestData.endDate),
      notes: this.priceRequestData.notes,
    });

    if (this.priceRequestData.services) {
      this.services.clear();
      this.priceRequestData.services.forEach((service) => {
        this.services.push(
          this.fb.group({
            serviceId: [service.serviceId, [Validators.required]],
            quantity: [service.quantity, [Validators.required]],
            shiftType: [service.shiftType, [Validators.required]],
          })
        );
      });
    }

    if (this.priceRequestData.otherServices) {
      this.otherServices.clear();
      this.priceRequestData.otherServices.forEach((otherService) => {
        this.otherServices.push(
          this.fb.group({
            name: [otherService.name, [Validators.required]],
            quantity: [otherService.quantity, [Validators.required]],
            shiftType: [otherService.shiftType, [Validators.required]],
          })
        );
      });
    }
  }
}
