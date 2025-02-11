import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
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
import { ICompany } from '../../../companies/models/ICompany';
import { CompanyUtilitiesService } from '../../../companies/services/company-utilities.service';
import { IPriceRequest } from '../../models/iprice-request';
import { PriceRequestsService } from '../../services/price-requests.service';

@Component({
  selector: 'app-price-request-details',
  standalone: true,
  imports: [ SelectModule, InputNumberModule, TextareaModule, DatePickerModule, ReactiveFormsModule, InputTextModule, TranslatePipe, InputComponent ],
  templateUrl: './price-request-details.component.html',
  styleUrl: './price-request-details.component.scss'
})
export class PriceRequestDetailsComponent implements OnInit {
private companyUtilities = inject(CompanyUtilitiesService);
  private localizationService = inject(LocalizationService);
  private priceRequestsService = inject(PriceRequestsService);
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);

  shiftType = this.localizationService.createDropdown(ShiftType);
  contractTypes = this.localizationService.createDropdown(ContractType);
  companyServices: ICompanyService[] = [];
  priceRequestData: IPriceRequest = {} as IPriceRequest;

  companyData: ICompany = {} as ICompany;
  editPriceRequestForm: FormGroup;

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
    this.editPriceRequestForm = this.fb.group({
      contractType: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      notes: [''],
      services: this.fb.array([]),
      otherServices: this.fb.array([]),
    });
  }
  get services() {
    return this.editPriceRequestForm.get('services') as FormArray;
  }
  get otherServices() {
    return this.editPriceRequestForm.get('otherServices') as FormArray;
  }
  assignValues() {
    this.editPriceRequestForm.patchValue({
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
            name: [otherService.name],
            quantity: [otherService.quantity],
            shiftType: [otherService.shiftType],
          })
        );
      });
    }
  }
}
