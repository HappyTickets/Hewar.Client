import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  Form,
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { InputComponent } from '../../../../../shared/components/input/input.component';
import { LocalizationService } from '../../../../../core/services/localization/localization.service';
import { ShiftType } from '../../../../../shared/enums/shift-type';
import { ContractType } from '../../../../../shared/enums/contract-type';
import { ActivatedRoute, Router } from '@angular/router';
import { PriceRequestsService } from '../../../../price-requests/services/price-requests.service';
import { IFacility } from '../../../../price-requests/models/ifacility';
import { ICompanyPriceRequest } from '../../../../price-requests/models/icompany-price-request';
import { AdsService } from '../../../services/ads.service';
import { ICreateAd } from '../../../models/icreate-ad';
import { IAdService } from '../../../models/iad-service';
import { IAdOffer } from '../../../models/ads-offers-interfaces/iad-offer';
import { AdsOffersServiceService } from '../../../services/ads-offers-service/ads-offers-service.service';

@Component({
  selector: 'app-edit-ad-offer',
  standalone: true,
  imports: [
    SelectModule,
    CommonModule,
    InputNumberModule,
    TextareaModule,
    ButtonModule,
    ReactiveFormsModule,
    InputTextModule,
    TranslatePipe,
    TranslatePipe,
    DatePickerModule,
    InputComponent,
  ],
  templateUrl: './edit-ad-offer.component.html',
  styleUrl: './edit-ad-offer.component.scss',
})
export class EditAdOfferComponent implements OnInit {
  private localizationService = inject(LocalizationService);
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private priceRequestsService = inject(PriceRequestsService);
  private adsService = inject(AdsService);
  private adsOffersService = inject(AdsOffersServiceService);

  shiftType = this.localizationService.createDropdown(ShiftType);
  contractTypes = this.localizationService.createDropdown(ContractType);

  editAdOfferAdForm!: FormGroup;
  date = new Date();
  facilityData: IFacility = {} as IFacility;
  mode: 'create' | 'update' = 'create';
  serviceId: IAdService[] = [];
  // company: ICompanyPriceRequest = {} as ICompanyPriceRequest
  constructor() {
    this.editAdOfferAdForm = this.fb.group({
      servicesCost: this.fb.array([this.createServicesCostGroup()]),
      otherServicesCost: this.fb.array([this.createOtherServicesCostGroup()]),
      companyServicesCost: this.fb.array([
        this.createCompanyServicesCostGroup(),
      ]),
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const adId = params.get('adId');
      if (adId) {
        this.priceRequestsService.getById(+adId).subscribe((res) => {
          if (res.data) {
            this.facilityData = res.data.facility;
          }
        });
      }
    });
    this.getServicId();
  }

  createServicesCostGroup(): FormGroup {
    return this.fb.group({
      serviceId: ['', Validators.required],
      quantity: ['', Validators.required],
      shiftType: ['', Validators.required],
      dailyCostPerUnit: ['', Validators.required],
      monthlyCostPerUnit: ['', Validators.required],
    });
  }

  get ServicesCost() {
    return this.editAdOfferAdForm.get('servicesCost') as FormArray;
  }

  addServicesCost(): void {
    this.ServicesCost.push(this.createServicesCostGroup());
  }
  removeServicesCost(index: number) {
    if (this.ServicesCost.length > 0) this.ServicesCost.removeAt(index);
  }

  createOtherServicesCostGroup(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      quantity: ['', Validators.required],
      shiftType: ['', Validators.required],
      dailyCostPerUnit: ['', Validators.required],
      monthlyCostPerUnit: ['', Validators.required],
    });
  }

  get OtherServicesCost() {
    return this.editAdOfferAdForm.get('otherServicesCost') as FormArray;
  }

  addOtherServicesCost() {
    this.OtherServicesCost.push(this.createOtherServicesCostGroup());
  }

  removeOtherServicesCost(index: number) {
    if (this.OtherServicesCost.length > 0)
      this.OtherServicesCost.removeAt(index);
  }

  createCompanyServicesCostGroup(): FormGroup {
    return this.fb.group({
      serviceId: ['', Validators.required],
      quantity: ['', Validators.required],
      dailyCostPerUnit: ['', Validators.required],
      monthlyCostPerUnit: ['', Validators.required],
      shiftType: ['', Validators.required],
    });
  }

  get CompanyServicesCost() {
    return this.editAdOfferAdForm.get('companyServicesCost') as FormArray;
  }

  addCompanyServicesCost() {
    this.CompanyServicesCost.push(this.createCompanyServicesCostGroup());
  }

  removeCompanyServicesCost(index: number) {
    if (this.CompanyServicesCost.length > 0)
      this.CompanyServicesCost.removeAt(index);
  }

  getServicId() {
    this.adsService.getHewarServices().subscribe({
      next: (res) => {
        if (res.data) this.serviceId = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onCancel(): void {
    this.editAdOfferAdForm.reset();
  }

  onSubmit() {
    if (this.editAdOfferAdForm.value) {
      const adOffer: IAdOffer = {
        adId: +this.route.snapshot.paramMap.get('adId')!,
        servicesCost: this.editAdOfferAdForm.value.servicesCost,
        otherServicesCost: this.editAdOfferAdForm.value.otherServicesCost,
        companyServicesCost: this.editAdOfferAdForm.value.companyServicesCost,
      };
      this.adsOffersService.createAdOffer(adOffer).subscribe((res) => {
        this.router.navigate(['/my-offers-as-company']);
        console.log(res);
      });
    }
  }
}
