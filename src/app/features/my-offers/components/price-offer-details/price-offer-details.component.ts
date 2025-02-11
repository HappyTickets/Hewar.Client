import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
import { ICompanyService } from '../../../companies/models/i-company-service';
import { CompanyUtilitiesService } from '../../../companies/services/company-utilities.service';
import { IFacility } from '../../../price-requests/models/ifacility';
import { IPriceRequest } from '../../../price-requests/models/iprice-request';
import { IGetPriceOfferById } from '../../models/iget-price-offer-by-id';
import { PriceOffersService } from '../../services/price-offers.service';

@Component({
  selector: 'app-price-offer-details',
  standalone: true,
  imports: [ DatePickerModule, SelectModule, InputNumberModule, TextareaModule, ButtonModule, ReactiveFormsModule, InputTextModule, TranslatePipe, InputComponent ],
  templateUrl: './price-offer-details.component.html',
  styleUrl: './price-offer-details.component.scss'
})
export class PriceOfferDetailsComponent implements OnInit {
  private companyUtilities = inject(CompanyUtilitiesService);
  private localizationService = inject(LocalizationService);
  private priceOffersService = inject(PriceOffersService);
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);

  companyServices: ICompanyService[] = [];
  shiftType = this.localizationService.createDropdown(ShiftType);
  contractTypes = this.localizationService.createDropdown(ContractType);

  priceOfferData: IGetPriceOfferById = {} as IGetPriceOfferById;
  priceRequestData: IPriceRequest = {} as IPriceRequest;
  facilityData: IFacility = {} as IFacility;
  createPriceOfferForm: FormGroup;
  date = new Date();
  loading = false;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.priceOffersService.getById(+id).subscribe(res=> {
          if (res.data) {
            this.priceOfferData = res.data;
            if (res.data.facility) this.facilityData = res.data.facility;
            this.getCompanyServices(res.data.priceRequest.company.id)
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
    this.createPriceOfferForm = this.fb.group({
      contractType: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      services: this.fb.array([]),
      otherServices: this.fb.array([]),
    });
  }
  get services() {
    return this.createPriceOfferForm.get('services') as FormArray;
  }
  get otherServices() {
    return this.createPriceOfferForm.get('otherServices') as FormArray;
  }
  onCancel(): void {
    this.createPriceOfferForm.reset();
  }
  assignValues() {
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
