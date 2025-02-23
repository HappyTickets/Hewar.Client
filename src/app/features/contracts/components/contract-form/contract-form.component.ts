import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { TranslatePipe } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { catchError, EMPTY, tap } from 'rxjs';
import { ContractService } from '../../services/contract.service';
import { IContractFields } from '../../models/icontract-fields';
import { PriceOffersService } from '../../../price-offers/services/price-offers.service';

@Component({
  selector: 'app-contract-form',
  standalone: true,
  imports: [ ReactiveFormsModule, CardModule, ButtonModule, InputComponent, TranslatePipe, CommonModule ],
  templateUrl: './contract-form.component.html',
  styleUrl: './contract-form.component.scss',
})
export class ContractFormComponent implements OnInit {
  private contractService = inject(ContractService);
  private priceOffersService = inject(PriceOffersService);
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  date = new Date(Date.now());
  mode: 'create' | 'update' = 'create';
  contractForm!: FormGroup;
  contractId = 0;
  offerId = 0;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.offerId = +(params.get('id') ?? 0);
      this.contractService.GetContractFieldsByOfferId(this.offerId).pipe(
          tap((res) => {
            if (res.data) {
              if (res.data.contractId) this.contractId = res.data.contractId;
              this.mode = 'update';
              this.assignValues(res.data);
            }
          }),
          catchError(() => {
            this.mode = 'create';
            return EMPTY;
          })
        ).subscribe();
    });
  }
  constructor() {
    this.contractForm = this.fb.group({
      contractSignDate: [''],
      contractStartDate: [''],

      companyNameAr: [''],
      companyNameEn: [''],
      companyMainOfficeCityAr: [''],
      companyMainOfficeCityEn: [''],
      companyTelephone: [''],
      companyMobile: [''],
      companyPublicSecurityLicense: [''],
      companyAddressCityAr: [''],
      companyAddressCityEn: [''],
      companyAddressPostalCode: [''],
      companyAddressUnitNumber: [''],
      companyAddressBuildingNumber: [''],
      companyCommercialRegistration: [''],
      companyRegistrationInSabl: [''],
      companyEmail: ['', [Validators.email]],
      companyRepresentativeNameAr: [''],
      companyRepresentativeNameEn: [''],
      companyRepresentativeTitleAr: [''],
      companyRepresentativeTitleEn: [''],
      companyGuardsCount: [null, [Validators.min(0)]],

      facilityNameAr: [''],
      facilityNameEn: [''],
      facilityMainOfficeCityAr: [''],
      facilityMainOfficeCityEn: [''],
      facilityMobile: [''],
      facilityCommercialRegistrationCityAr: [''],
      facilityCommercialRegistrationCityEn: [''],
      facilityAddressCityAr: [''],
      facilityAddressCityEn: [''],
      facilityAddressPostalCode: [''],
      facilityAddressUnitNumber: [''],
      facilityAddressBuildingNumber: [''],
      facilityEmail: ['', [ Validators.email]],
      facilityRepresentativeNameAr: [''],
      facilityRepresentativeNameEn: [''],
      facilityRepresentativeTitleAr: [''],
      facilityRepresentativeTitleEn: [''],
      facilityLocationToBeSecuredAr: [''],
      facilityLocationToBeSecuredEn: [''],
    });
  }
  submitContract() {
    if (this.contractForm.valid) {
      if (this.mode === 'create') {
        this.contractService.CreateContractForOffer(this.contractForm.value, this.offerId).subscribe(() => {
          this.router.navigate([`contract-preview/${this.offerId}`]);
        });
      } else {
        this.contractService.UpdateContractByFields(this.contractForm.value, this.contractId).subscribe(() => {
            this.router.navigate([`contract-preview/${this.offerId}`]);
          });
      }
    }
  }
  fillValues() {
    this.priceOffersService.getById(this.offerId).subscribe(res => {
      if (res.data && res.data.facility) {
        this.contractForm.patchValue({
          facilityNameAr: res.data.facility.name,
          facilityNameEn: res.data.facility.name,
          facilityRepresentativeNameAr: res.data.facility.responsibleName,
          facilityRepresentativeNameEn: res.data.facility.responsibleName,
          facilityMobile: res.data.facility.responsiblePhone,
        });
      } else if (res.data && res.data.company) {
        this.contractForm.patchValue({
          companyNameAr: res.data.company.name,
          companyNameEn: res.data.company.name,
          companyMainOfficeCityAr: res.data.company.address.city,
          companyMainOfficeCityEn: res.data.company.address.city,
          companyTelephone: res.data.company.phoneNumber,
          companyMobile: res.data.company.phoneNumber,
          companyAddressCityAr: res.data.company.address.city,
          companyAddressCityEn: res.data.company.address.city,
          companyAddressPostalCode: res.data.company.address.postalCode,
          companyEmail: res.data.company.contactEmail,
        });
      }
    })
  }
  assignValues(res: IContractFields) {
    this.contractForm.patchValue(res.contractFields);
  }
}
