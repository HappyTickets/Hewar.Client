import { Component, inject, OnInit } from '@angular/core';
import { CompaniesService } from '../../../companies/services/companies.service';
import { ICompany } from '../../../companies/models/ICompany';
import { ActivatedRoute } from '@angular/router';
import { InputNumberModule } from 'primeng/inputnumber';
import { TextareaModule } from 'primeng/textarea';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule,Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { ContractType } from '../../../../shared/enums/contract-type';
import { ShiftType } from '../../../../shared/enums/shift-type';
import { SecurityRoles } from '../../../../shared/enums/security-roles';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-price-request',
  standalone: true,
  imports: [SelectModule, InputNumberModule, TextareaModule, ButtonModule, DatePickerModule, ReactiveFormsModule, InputTextModule, TranslatePipe],
  templateUrl: './create-price-request.component.html',
  styleUrl: './create-price-request.component.scss',
})
export class CreatePriceRequestComponent implements OnInit {
  private companiesService = inject(CompaniesService);
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);
  contractTypes = Object.entries(ContractType)
    .filter(([key]) => isNaN(Number(key)))
    .map(([key, value]) => ({ label: key, value }));
  shiftType = Object.entries(ShiftType)
    .filter(([key]) => isNaN(Number(key)))
    .map(([key, value]) => ({ label: key, value }));
  securityRoles = Object.entries(SecurityRoles).filter(([key]) => isNaN(Number(key))).map(([key, value]) => ({ label: key, value }));companyData: ICompany = {} as ICompany;

  date = new Date();
  createPriceRequestForm: FormGroup;
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.companiesService
        .getCompanyById(params.get('id')!)
        .subscribe((res) => {
          this.companyData = res.data;
          this.createPriceRequestForm.patchValue({ id: this.companyData.id });
        });
    });
  }

  constructor() {
    this.createPriceRequestForm = this.fb.group({
      companyId: [this.companyData.id],
      contractType: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      notes: [''],
      services: this.fb.array([this.createServiceGroup()]),
      otherServices: this.fb.array([this.createOtherServiceGroup()]),
    });
  }
  createServiceGroup(): FormGroup {
    return this.fb.group({
      serviceId: [null, [Validators.required]],
      quantity: [null, [Validators.required]],
      shiftType: ['', [Validators.required]],
    });
  }
  createOtherServiceGroup(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required]],
      quantity: [null, [Validators.required]],
      shiftType: ['', [Validators.required]],
    });
  }
  get services() {
    return this.createPriceRequestForm.get('services') as FormArray;
  }
  get otherServices() {
    return this.createPriceRequestForm.get('otherServices') as FormArray;
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
  onSubmit(): void {
    console.log(this.createPriceRequestForm.value);
  }
  onCancel(): void {
    this.createPriceRequestForm.reset();
  }
}
