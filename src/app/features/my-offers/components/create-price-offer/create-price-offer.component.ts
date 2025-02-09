import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { ICompany } from '../../../companies/models/ICompany';
import { PriceOffersService } from '../../services/price-offers.service';
import { ICompanyService } from '../../../companies/models/i-company-service';
import { CompanyUtilitiesService } from '../../../companies/services/company-utilities.service';
import { ICreatePriceOffer } from '../../models/icreate-price-offer';
import { PriceRequestsService } from '../../../price-requests/services/price-requests.service';
import { FacilitiesService } from '../../../facilities/services/facilities.service';
import { IPriceRequest } from '../../../price-requests/models/iprice-request';
import { IFacility } from '../../../price-requests/models/ifacility';
import { DatePicker } from 'primeng/datepicker';

@Component({
  selector: 'app-create-price-offer',
  standalone: true,
  imports: [ SelectModule, InputNumberModule, TextareaModule, ButtonModule, ReactiveFormsModule, InputTextModule, TranslatePipe, DatePicker ],
  templateUrl: './create-price-offer.component.html',
  styleUrl: './create-price-offer.component.scss',
})
export class CreatePriceOfferComponent implements OnInit {
  private companyUtilities = inject(CompanyUtilitiesService);
  private companiesService = inject(FacilitiesService);
  private priceOffersService = inject(PriceOffersService);
  private priceRequestsService = inject(PriceRequestsService);

  private router = inject(Router);

  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);
  companyServices: ICompanyService[] = [];

  priceRequestData: IPriceRequest = {} as IPriceRequest;
  facilityData: IFacility = {} as IFacility;
  companyData: ICompany = {} as ICompany;
  createPriceOfferForm: FormGroup;
  date = new Date();
  loading = false;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.priceRequestsService.getById(+id).subscribe((res) => {
          if (res.data) {
            console.log(res.data);
            this.companyData = res.data.company;
            this.facilityData = res.data.facility;

            // this.priceRequestData = res.data;
            // this.getCompanyServices(this.companyData.id);
            // this.assignValues();
            // console.log(res.data);

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
      services: this.fb.array([this.createServiceGroup()]),
      otherServices: this.fb.array([this.createOtherServiceGroup()]),
    });
  }
  onSubmit(): void {
    if (this.createPriceOfferForm.valid) {
      const priceOffer: ICreatePriceOffer = {
        priceRequestId: this.companyData.id,
        services: this.createPriceOfferForm.value.services,
        otherServices: this.createPriceOfferForm.value.otherServices,
      };
      this.priceOffersService.create(priceOffer).subscribe(() => {
          this.router.navigate(['/facilities/price-offer']);
        });
    }
  }
  createServiceGroup(): FormGroup {
    return this.fb.group({
      serviceId: [null, [Validators.required]],
      quantity: [null, [Validators.required]],
      dailyCostPerUnit: [null, [Validators.required]],
      monthlyCostPerUnit: [null, [Validators.required]],
    });
  }
  createOtherServiceGroup(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required]],
      quantity: [null, [Validators.required]],
      dailyCostPerUnit: [null, [Validators.required]],
      monthlyCostPerUnit: [null, [Validators.required]],
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
  assignValues() {
    this.createPriceOfferForm.patchValue({
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
