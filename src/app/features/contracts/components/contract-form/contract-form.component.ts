import { Component, inject, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { TranslatePipe } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { catchError, EMPTY, tap } from 'rxjs';
import { ContractService } from '../../services/contract.service';
import { IContractFields } from '../../models/icontract-fields';

@Component({
  selector: 'app-contract-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CardModule,
    ButtonModule,
    InputComponent,
    TranslatePipe,
    CommonModule,
  ],
  templateUrl: './contract-form.component.html',
  styleUrl: './contract-form.component.scss',
})
export class ContractFormComponent implements OnInit {
  private contractService = inject(ContractService);
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
      this.contractService
        .GetContractFieldsByOfferId(this.offerId)
        .pipe(
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
        )
        .subscribe();
    });
  }
  constructor() {
    this.contractForm = this.fb.group({
      contractSignDate: ['', Validators.required],
      contractStartDate: ['', Validators.required],

      companyNameAr: ['', Validators.required],
      companyNameEn: ['', Validators.required],
      companyMainOfficeCityAr: ['', Validators.required],
      companyMainOfficeCityEn: ['', Validators.required],
      companyTelephone: ['', [Validators.required]],
      companyMobile: ['', [Validators.required]],
      companyPublicSecurityLicense: ['', Validators.required],
      companyAddressCityAr: ['', Validators.required],
      companyAddressCityEn: ['', Validators.required],
      companyAddressPostalCode: ['', [Validators.required]],
      companyAddressUnitNumber: ['', Validators.required],
      companyAddressBuildingNumber: ['', Validators.required],
      companyCommercialRegistration: ['', Validators.required],
      companyRegistrationInSabl: ['', Validators.required],
      companyEmail: ['', [Validators.required, Validators.email]],
      companyRepresentativeNameAr: ['', Validators.required],
      companyRepresentativeNameEn: ['', Validators.required],
      companyRepresentativeTitleAr: ['', Validators.required],
      companyRepresentativeTitleEn: ['', Validators.required],
      companyGuardsCount: [null, [Validators.required, Validators.min(0)]],

      facilityNameAr: ['', Validators.required],
      facilityNameEn: ['', Validators.required],
      facilityMainOfficeCityAr: ['', Validators.required],
      facilityMainOfficeCityEn: ['', Validators.required],
      facilityMobile: ['', [Validators.required]],
      facilityCommercialRegistrationCityAr: ['', Validators.required],
      facilityCommercialRegistrationCityEn: ['', Validators.required],
      facilityAddressCityAr: ['', Validators.required],
      facilityAddressCityEn: ['', Validators.required],
      facilityAddressPostalCode: ['', [Validators.required]],
      facilityAddressUnitNumber: ['', Validators.required],
      facilityAddressBuildingNumber: ['', Validators.required],
      facilityEmail: ['', [Validators.required, Validators.email]],
      facilityRepresentativeNameAr: ['', Validators.required],
      facilityRepresentativeNameEn: ['', Validators.required],
      facilityRepresentativeTitleAr: ['', Validators.required],
      facilityRepresentativeTitleEn: ['', Validators.required],
      facilityLocationToBeSecuredAr: ['', Validators.required],
      facilityLocationToBeSecuredEn: ['', Validators.required],
    });
  }

  submitContract() {
    if (this.contractForm.valid) {
      if (this.mode === 'create') {
        this.contractService
          .CreateContractForOffer(this.contractForm.value, this.offerId)
          .subscribe(() => {
            this.router.navigate([`contract-preview/${this.offerId}`]);
          });
      } else {
        this.contractService
          .UpdateContractByFields(this.contractForm.value, this.contractId)
          .subscribe(() => {
            this.router.navigate([`contract-preview/${this.offerId}`]);
          });
      }
    }
  }
  assignValues(res: IContractFields) {
    this.contractForm.patchValue(res.contractFields);
  }
}
