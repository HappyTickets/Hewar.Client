import { Component, inject, OnInit } from '@angular/core';
<<<<<<< HEAD
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
=======
import { FormGroup, FormBuilder, Validators, FormArray, ReactiveFormsModule, FormControl } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DatePickerModule } from 'primeng/datepicker';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { TranslatePipe } from '@ngx-translate/core';
import { ContractsService } from '../../services/contracts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IFillContract } from '../../models/ifill-contract';
import { CommonModule } from '@angular/common';
import { IContract } from '../../models/icontract';
import { catchError, EMPTY, tap } from 'rxjs';
import { IUpdateContract } from '../../models/iupdate-contract';

@Component({
  selector: 'app-contract-form',
  standalone: true,
<<<<<<< HEAD
  imports: [ ReactiveFormsModule, CardModule, ButtonModule, InputComponent, TranslatePipe, CommonModule ],
=======
  imports: [ReactiveFormsModule, CardModule, TableModule, ButtonModule, InputTextModule, DatePickerModule, InputComponent, TranslatePipe, CommonModule],
>>>>>>> 1f61da8 (create the services, models, form component)
  templateUrl: './contract-form.component.html',
  styleUrl: './contract-form.component.scss',
})
export class ContractFormComponent implements OnInit {
<<<<<<< HEAD
  private contractService = inject(ContractService);
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private router = inject(Router);
  date = new Date(Date.now());
  mode: 'create' | 'update' = 'create';
  contractForm!: FormGroup;
  contractId = 0;
=======
  private contractsService = inject(ContractsService);
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
      this.contractsService.getContractFieldsByOfferId(this.offerId).pipe(
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
      contractSignDate: ['', Validators.required],
      contractStartDate: ['', Validators.required],
<<<<<<< HEAD

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
  assignValues(res: IContractFields) {
    this.contractForm.patchValue(res.contractFields);
=======
      partyOne: this.fb.group({
        name: this.fb.group({ ar: ['', Validators.required], en: ['', Validators.required] }),
        mainOfficeCity: this.fb.group({ ar: ['', Validators.required], en: ['', Validators.required] }),
        publicSecurityLicense: ['', Validators.required],
        telephone: ['', Validators.required],
        mobile: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        nationalAddress: this.fb.group({
          city: this.fb.group({
            ar: ['', Validators.required],
            en: ['', Validators.required],
          }),
          postalCode: ['', Validators.required],
          unitNumber: ['', Validators.required],
          buildingNumber: ['', Validators.required],
        }),
        representativeName: this.fb.group({
          ar: ['', Validators.required],
          en: ['', Validators.required],
        }),
        representativeTitle: this.fb.group({
          ar: ['', Validators.required],
          en: ['', Validators.required],
        }),
        commercialRegistration: ['', Validators.required],
        registrationInSabl: ['', Validators.required],
        guardsCount: [0, Validators.required],
      }),
      partyTwo: this.fb.group({
        name: this.fb.group({
          ar: ['', Validators.required],
          en: ['', Validators.required],
        }),
        mainOfficeCity: this.fb.group({
          ar: ['', Validators.required],
          en: ['', Validators.required],
        }),
        publicSecurityLicense: ['', Validators.required],
        telephone: ['', Validators.required],
        mobile: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        nationalAddress: this.fb.group({
          city: this.fb.group({
            ar: ['', Validators.required],
            en: ['', Validators.required],
          }),
          postalCode: ['', Validators.required],
          unitNumber: ['', Validators.required],
          buildingNumber: ['', Validators.required],
        }),
        representativeName: this.fb.group({
          ar: ['', Validators.required],
          en: ['', Validators.required],
        }),
        representativeTitle: this.fb.group({
          ar: ['', Validators.required],
          en: ['', Validators.required],
        }),
        commercialRegistrationCity: this.fb.group({
          ar: ['', Validators.required],
          en: ['', Validators.required],
        }),
        locationToBeSecured: this.fb.group({
          ar: ['', Validators.required],
          en: ['', Validators.required],
        }),
      }),
      scheduleEntries: this.fb.array([]),
      customClauses: this.fb.array([]),
    });
  }
  get scheduleEntries(): FormArray {
    return this.contractForm.get('scheduleEntries') as FormArray;
  }
  get customClauses(): FormArray {
    return this.contractForm.get('customClauses') as FormArray;
  }
  addScheduleEntry() {
    const scheduleEntries = this.contractForm.get('scheduleEntries') as FormArray;
    scheduleEntries.push(
      this.fb.group({
        location: this.fb.group({
          ar: ['', Validators.required],
          en: ['', Validators.required],
        }),
        guardsRequired: this.fb.group({
          ar: ['', Validators.required],
          en: ['', Validators.required],
        }),
        shiftTime: this.fb.group({
          ar: ['', Validators.required],
          en: ['', Validators.required],
        }),
        notes: this.fb.group({
          ar: [''],
          en: [''],
        }),
      })
    );
  }
  removeScheduleEntry(index: number) {
    const scheduleEntries = this.contractForm.get('scheduleEntries') as FormArray;
    scheduleEntries.removeAt(index);
  }
  addCustomClause() {
    const customClauses = this.contractForm.get('customClauses') as FormArray;
    customClauses.push(
      this.fb.group({
        ar: ['', Validators.required],
        en: ['', Validators.required],
      })
    );
  }
  removeCustomClause(index: number) {
    const customClauses = this.contractForm.get('customClauses') as FormArray;
    customClauses.removeAt(index);
  }
  getPartyField(field: string): FormControl {
    return this.contractForm.get(field) as FormControl || new FormControl('');
  }
  submitContract() {
    if (this.contractForm.valid) {
      if (this.mode === 'create') {
        const form: IFillContract = {contract: this.contractForm.value, offerId:this.offerId}
        this.contractsService.fillFields(form).subscribe(() => {
          this.router.navigate([`contract-preview/${this.contractId}`]);
        });
      } else {
        const form: IUpdateContract = {contract: this.contractForm.value, id: this.contractId}
        this.contractsService.updateFields(form).subscribe(() => {
          this.router.navigate([`contract-preview/${this.contractId}`]);
        });
      }
    }
  }
  assignValues(res: IContract) {
    this.contractForm.patchValue({
      partyOne: res.partyOne,
      partyTwo: res.partyTwo,
      contractSignDate: new Date(res.contractSignDate),
      contractStartDate: new Date(res.contractStartDate),
    });
    if (res.scheduleEntries && res.scheduleEntries.length > 0) {
      res.scheduleEntries.forEach(entry => {
        const scheduleEntryGroup = this.fb.group({
          location: this.fb.group({
            ar: [entry.location.ar, Validators.required],
            en: [entry.location.en, Validators.required],
          }),
          guardsRequired: this.fb.group({
            ar: [entry.guardsRequired.ar, Validators.required],
            en: [entry.guardsRequired.en, Validators.required],
          }),
          shiftTime: this.fb.group({
            ar: [entry.shiftTime.ar, Validators.required],
            en: [entry.shiftTime.en, Validators.required],
          }),
          notes: this.fb.group({
            ar: [entry.notes.ar],
            en: [entry.notes.en],
          }),
        });
        this.scheduleEntries.push(scheduleEntryGroup);
      });
    }
    if (res.customClauses && res.customClauses.length > 0) {
      res.customClauses.forEach(clause => {
        const customClauseGroup = this.fb.group({
          ar: [clause.ar, Validators.required],
          en: [clause.en, Validators.required],
        });
        this.customClauses.push(customClauseGroup);
      });
    }
>>>>>>> 1f61da8 (create the services, models, form component)
  }
}
