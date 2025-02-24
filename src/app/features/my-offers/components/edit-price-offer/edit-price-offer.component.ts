import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { LocalizationService } from '../../../../core/services/localization/localization.service';
import { ShiftType } from '../../../../shared/enums/shift-type';
import { ICompanyService } from '../../../companies/models/i-company-service';
import { CompanyUtilitiesService } from '../../../companies/services/company-utilities.service';
import { IFacility } from '../../../price-requests/models/ifacility';
import { IPriceRequest } from '../../../price-requests/models/iprice-request';
import { PriceRequestsService } from '../../../price-requests/services/price-requests.service';
import { ICreatePriceOffer } from '../../models/icreate-price-offer';
import { PriceOffersService } from '../../services/price-offers.service';
import { IGetPriceOfferById } from '../../models/iget-price-offer-by-id';
import { IUpdatePriceOffer } from '../../models/iupdate-price-offer';
import { ContractType } from '../../../../shared/enums/contract-type';
import { DatePickerModule } from 'primeng/datepicker';
import { InputComponent } from '../../../../shared/components/input/input.component';

@Component({
  selector: 'app-edit-price-offer',
  standalone: true,
  imports: [ SelectModule, InputNumberModule, TextareaModule, ButtonModule, ReactiveFormsModule, InputTextModule, TranslatePipe, CommonModule, TranslatePipe , DatePickerModule, InputComponent],
  templateUrl: './edit-price-offer.component.html',
  styleUrl: './edit-price-offer.component.scss',
})
export class EditPriceOfferComponent implements OnInit {
  private companyUtilities = inject(CompanyUtilitiesService);
  private localizationService = inject(LocalizationService);
  private priceOffersService = inject(PriceOffersService);
  private priceRequestsService = inject(PriceRequestsService);
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  companyServices: ICompanyService[] = [];
  shiftType = this.localizationService.createDropdown(ShiftType);
  contractTypes = this.localizationService.createDropdown(ContractType);

  mode: "create" | "update" = 'create';
  priceOfferData: IGetPriceOfferById = {} as IGetPriceOfferById;
  priceRequestData: IPriceRequest = {} as IPriceRequest;
  facilityData: IFacility = {} as IFacility;
  createPriceOfferForm: FormGroup;
  date = new Date();
  loading = false;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const priceRequestId = params.get('priceRequestId');
      const priceOfferId = params.get('priceOfferId');

      if (priceRequestId) {
        this.priceRequestsService.getById(+priceRequestId).subscribe((res) => {
          if (res.data) {
            this.facilityData = res.data.facility;
            this.priceRequestData = res.data;
            this.getCompanyServices(this.priceRequestData.company.id);
            this.assignCreateValues();
            this.mode = 'create';
          }
        });
      } else if (priceOfferId) {
        this.priceOffersService.getById(+priceOfferId).subscribe(res=> {
          if (res.data) {
            this.priceOfferData = res.data;
            if (res.data.facility) this.facilityData = res.data.facility;
            this.getCompanyServices(res.data.priceRequest.company.id)
            this.assignUpdateValues();
            this.mode = 'update';
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
    this.createPriceOfferForm = this.fb.group({
      contractType: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      services: this.fb.array([this.createServiceGroup()]),
      otherServices: this.fb.array([this.createOtherServiceGroup()]),
    });
  }
  onSubmit(): void {
    if (this.createPriceOfferForm.valid) {
      if (this.mode === 'create') {
        const priceOffer: ICreatePriceOffer = {
          priceRequestId: this.priceRequestData.id,
          contractType: this.createPriceOfferForm.value.contractType,
          startDate: this.createPriceOfferForm.value.startDate,
          endDate: this.createPriceOfferForm.value.endDate,
          services: this.createPriceOfferForm.value.services,
          otherServices: this.createPriceOfferForm.value.otherServices,
        };
        this.priceOffersService.create(priceOffer).subscribe(() => {
          this.router.navigate(['/company-price-offer']);
        });
      } else if (this.mode === 'update') {
        const priceOffer: IUpdatePriceOffer = {
          priceOfferId: this.priceOfferData.id,
          contractType: this.createPriceOfferForm.value.contractType,
          startDate: this.createPriceOfferForm.value.startDate,
          endDate: this.createPriceOfferForm.value.endDate,
          services: this.createPriceOfferForm.value.services,
          otherServices: this.createPriceOfferForm.value.otherServices,
        };
      this.priceOffersService.update(priceOffer).subscribe(() => {
        this.router.navigate(['/company-price-offer']);
      });
      }
    }
  }
  createServiceGroup(): FormGroup {
    return this.fb.group({
      serviceId: [null, [Validators.required]],
      quantity: [null, [Validators.required]],
      dailyCostPerUnit: [null, [Validators.required]],
      monthlyCostPerUnit: [null, [Validators.required]],
      shiftType: [null, [Validators.required]],
    });
  }
  createOtherServiceGroup(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required]],
      quantity: [null, [Validators.required]],
      dailyCostPerUnit: [null, [Validators.required]],
      monthlyCostPerUnit: [null, [Validators.required]],
      shiftType: [null, [Validators.required]],
    });
  }
  get services() {
    return this.createPriceOfferForm.get('services') as FormArray;
  }
  get otherServices() {
    return this.createPriceOfferForm.get('otherServices') as FormArray;
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
    this.createPriceOfferForm.reset();
  }
  assignCreateValues() {
    this.createPriceOfferForm.patchValue({
      contractType: this.priceRequestData.contractType,
      startDate: new Date(this.priceRequestData.startDate),
      endDate: new Date(this.priceRequestData.endDate),
    });
    if (this.priceRequestData.services) {
      this.services.clear();
      this.priceRequestData.services.forEach((service) => {
        this.services.push(
          this.fb.group({
            serviceId: [service.serviceId, [Validators.required]],
            quantity: [service.quantity, [Validators.required]],
            shiftType: [service.shiftType, [Validators.required]],
            dailyCostPerUnit: [null, [Validators.required]],
            monthlyCostPerUnit: [null, [Validators.required]],
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
            dailyCostPerUnit: [null, [Validators.required]],
            monthlyCostPerUnit: [null, [Validators.required]],
          })
        );
      });
    }
  }
  assignUpdateValues() {
    this.createPriceOfferForm.patchValue({
      contractType: this.priceOfferData.priceRequest.contractType,
      startDate: new Date(this.priceOfferData.priceRequest.startDate),
      endDate: new Date(this.priceOfferData.priceRequest.endDate),
    });
    if (this.priceOfferData.services) {
      this.services.clear();
      this.priceOfferData.services.forEach((service) => {
        this.services.push(
          this.fb.group({
            serviceId: [service.serviceId, [Validators.required]],
            quantity: [service.quantity, [Validators.required]],
            shiftType: [service.shiftType, [Validators.required]],
            dailyCostPerUnit: [service.dailyCostPerUnit, [Validators.required]],
            monthlyCostPerUnit: [service.monthlyCostPerUnit, [Validators.required]],
          })
        );
      });
    }

    if (this.priceOfferData.otherServices) {
      this.otherServices.clear();
      this.priceOfferData.otherServices.forEach((otherService) => {
        this.otherServices.push(
          this.fb.group({
            name: [otherService.name, [Validators.required]],
            quantity: [otherService.quantity, [Validators.required]],
            shiftType: [otherService.shiftType, [Validators.required]],
            dailyCostPerUnit: [otherService.dailyCostPerUnit, [Validators.required]],
            monthlyCostPerUnit: [otherService.monthlyCostPerUnit, [Validators.required]],
          })
        );
      });
    }
  }
}
