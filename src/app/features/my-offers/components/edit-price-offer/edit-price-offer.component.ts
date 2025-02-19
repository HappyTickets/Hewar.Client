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
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-price-offer',
  standalone: true,
  imports: [ SelectModule,CommonModule, InputNumberModule, TextareaModule, ButtonModule, ReactiveFormsModule, InputTextModule, TranslatePipe, TranslatePipe , DatePickerModule, InputComponent],
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
  editPriceOfferForm: FormGroup;
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
            this.getCompanyServices(res.data.priceRequest.company.id);
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
    this.editPriceOfferForm = this.fb.group({
      contractType: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      services: this.fb.array([this.createServiceGroup()]),
      otherServices: this.fb.array([this.createOtherServiceGroup()]),
    });
  }
  onSubmit(): void {
    if (this.editPriceOfferForm.valid) {
      if (this.mode === 'create') {
        const priceOffer: ICreatePriceOffer = {
          priceRequestId: this.priceRequestData.id,
          contractType: this.editPriceOfferForm.value.contractType,
          startDate: this.editPriceOfferForm.value.startDate,
          endDate: this.editPriceOfferForm.value.endDate,
          services: this.editPriceOfferForm.value.services,
          otherServices: this.editPriceOfferForm.value.otherServices,
        };
        this.priceOffersService.create(priceOffer).subscribe(() => {
          this.router.navigate(['/company-price-offer']);
        });
      } else if (this.mode === 'update') {
        const priceOffer: IUpdatePriceOffer = {
          priceOfferId: this.priceOfferData.id,
          contractType: this.editPriceOfferForm.value.contractType,
          startDate: this.editPriceOfferForm.value.startDate,
          endDate: this.editPriceOfferForm.value.endDate,
          services: this.editPriceOfferForm.value.services,
          otherServices: this.editPriceOfferForm.value.otherServices,
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
    return this.editPriceOfferForm.get('services') as FormArray;
  }
  get otherServices() {
    return this.editPriceOfferForm.get('otherServices') as FormArray;
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
    this.editPriceOfferForm.reset();
  }
  assignCreateValues() {
    this.editPriceOfferForm.patchValue({
      contractType: this.priceRequestData.contractType,
      startDate: new Date(this.priceRequestData.startDate),
      endDate: new Date(this.priceRequestData.endDate),
    });

    this.services.clear();
    if (this.priceRequestData.services) {
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

    this.otherServices.clear();
    if (this.priceRequestData.otherServices) {
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
    this.editPriceOfferForm.patchValue({
      contractType: this.priceOfferData.priceRequest.contractType,
      startDate: new Date(this.priceOfferData.priceRequest.startDate),
      endDate: new Date(this.priceOfferData.priceRequest.endDate),
    });

    this.services.clear();
    if (this.priceOfferData.services) {
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

    this.otherServices.clear();
    if (this.priceOfferData.otherServices) {
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
