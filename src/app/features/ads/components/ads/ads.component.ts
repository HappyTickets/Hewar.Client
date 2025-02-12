import { Component, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ContractType } from '../../../../shared/enums/contract-type';
import { ShiftType } from '../../../../shared/enums/shift-type';
import { AdsService } from '../../services/ads.service';
import { DatePickerModule } from 'primeng/datepicker';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { InputNumberModule } from 'primeng/inputnumber';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';
import { TranslatePipe } from '@ngx-translate/core';
import { SecurityRoles } from '../../../../shared/enums/security-roles';

@Component({
  selector: 'app-ads',
  standalone: true,
  imports: [
    SelectModule,
    InputNumberModule,
    TextareaModule,
    ButtonModule,
    DatePickerModule,
    ReactiveFormsModule,
    InputTextModule,
    TranslatePipe,
  ],
  templateUrl: './ads.component.html',
  styleUrl: './ads.component.scss',
})
export class AdsComponent {
  createAdForm: FormGroup;

  private fb = inject(FormBuilder);
  private adsService = inject(AdsService);

  contractTypes = Object.entries(ContractType)
    .filter(([key]) => isNaN(Number(key)))
    .map(([key, value]) => ({ label: key, value }));
  shiftType = Object.entries(ShiftType)
    .filter(([key]) => isNaN(Number(key)))
    .map(([key, value]) => ({ label: key, value }));

  securityRoles = Object.entries(SecurityRoles)
    .filter(([key]) => isNaN(Number(key)))
    .map(([key, value]) => ({ label: key, value }));

  date = new Date();

  constructor() {
    this.createAdForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      contractType: ['', Validators.required],
      shiftType: ['', Validators.required],
      // salary: ['', Validators.required],
      // location: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      services: this.fb.array([this.createServiceGroup()]),
      otherServices: this.fb.array([this.createOtherServiceGroup()]),
    });
  }

  createServiceGroup(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required]],
      quantity: [null, [Validators.required]],
      shiftType: ['', [Validators.required]],
    });
  }

  get services() {
    return this.createAdForm.get('services') as FormArray;
  }

  addService(): void {
    this.services.push(this.createServiceGroup());
  }

  removeService(index: number): void {
    if (this.services.length > 0) {
      this.services.removeAt(index);
    }
  }

  createOtherServiceGroup(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required]],
      quantity: [null, [Validators.required]],
      shiftType: ['', [Validators.required]],
    });
  }
  get otherServices() {
    return this.createAdForm.get('otherServices') as FormArray;
  }

  addOtherService(): void {
    this.otherServices.push(this.createOtherServiceGroup());
  }
  removeOtherService(index: number): void {
    if (this.otherServices.length > 0) {
      this.otherServices.removeAt(index);
    }
  }

  onSubmit(): void {
    console.log(this.createAdForm.value);
  }
  onCancel(): void {
    this.createAdForm.reset();
  }
}
