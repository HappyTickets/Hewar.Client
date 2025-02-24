import { Component, inject, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
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
import { MessageModule } from 'primeng/message';
import { ICreateAd } from '../../models/icreate-ad';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { IAdService } from '../../models/iad-service';
import { AdsStatus } from '../../enums/adsStatus';
import { IUpdateAd } from '../../models/iupdate-ad';

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
    MessageModule,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './ads.component.html',
  styleUrl: './ads.component.scss',
})
export class AdsComponent implements OnInit {
  createAdForm: FormGroup;
  isEditMode = false;
  isDetailsMode = false;
  id: number | null = null;
  adData: ICreateAd = {} as ICreateAd;

  private fb = inject(FormBuilder);
  private adsService = inject(AdsService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  contractTypes = Object.entries(ContractType)
    .filter(([key]) => isNaN(Number(key)))
    .map(([key, value]) => ({ label: key, value }));
  shiftType = Object.entries(ShiftType)
    .filter(([key]) => isNaN(Number(key)))
    .map(([key, value]) => ({ label: key, value }));

  AdStatus = Object.entries(AdsStatus)
    .filter(([key]) => isNaN(Number(key)))
    .map(([key, value]) => ({ label: key, value }));

  date = new Date();
  servicesOptions: IAdService[] = [];

  constructor() {
    this.createAdForm = this.fb.group({
      title: ['', Validators.required],
      contractType: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      status: [''],
      services: this.fb.array([this.createServiceGroup()]),
      otherServices: this.fb.array([this.createOtherServiceGroup()]),
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.id = +params['id'];
        this.route.queryParams.subscribe((queryParams) => {
          if (queryParams['mode'] === 'details') {
            this.isDetailsMode = true;
          } else {
            this.isEditMode = true;
          }
          if (this.id !== null) {
            this.loadAdData(this.id);
          }
        });
      }
    });

    this.adsService.getHewarServices().subscribe({
      next: (data) => {
        if (data.data) this.servicesOptions = data.data;
      },
      error: (error) => {
        console.error('Error fetching Hewar services:', error);
      },
    });
  }

  loadAdData(id: number): void {
    this.adsService.getAdById(id).subscribe((res) => {
      if (res.data) this.adData = res.data;
      this.createAdForm.patchValue({
        id: this.adData.id,
        title: this.adData.title,
        contractType: this.adData.contractType,
        status: this.adData.status,
        startDate: this.adData.startDate
          ? new Date(this.adData.startDate)
          : null,
        endDate: this.adData.endDate ? new Date(this.adData.endDate) : null,
      });

      this.services.clear();

      this.adData.services.forEach((service) => {
        this.services.push(
          this.fb.group({
            serviceId: [service.serviceId],
            quantity: [service.quantity],
            shiftType: [service.shiftType],
          })
        );
      });

      this.otherServices.clear();

      this.adData.otherServices.forEach((otherService)=> {
        this.otherServices.push(
          this.fb.group({
            name: [otherService.name],
            quantity: [otherService.quantity],
            shiftType: [otherService.shiftType]
          })
          
        )
      })
    });
  }

  createServiceGroup(): FormGroup {
    return this.fb.group({
      serviceId: [null, [Validators.required]],
      quantity: [null, [Validators.required]],
      shiftType: ['', [Validators.required]],
    });
  }

  get services(): FormArray {
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
  onSubmit(): void {
    this.createAdForm.markAllAsTouched();
    if (this.createAdForm.valid) {
      const adData: ICreateAd = {
        title: this.createAdForm.value.title,
        startDate: this.createAdForm.value.startDate,
        endDate: this.createAdForm.value.endDate,
        contractType: this.createAdForm.value.contractType,
        services: this.createAdForm.value.services,
        otherServices: this.createAdForm.value.otherServices
      };

      if (this.isEditMode && this.id) {
        const updateAdData: IUpdateAd = {
          id: this.id,
          title: this.createAdForm.value.title,
          startDate: this.createAdForm.value.startDate,
          endDate: this.createAdForm.value.endDate,
          contractType: this.createAdForm.value.contractType,
          services: this.createAdForm.value.services,
          status: this.createAdForm.value.status,
          otherServices: this.createAdForm.value.otherServices
        };
        this.adsService.updateAd(updateAdData).subscribe({
          next: (res) => {
            console.log(res);
            this.router.navigate(['/myAds']);
          },
          error: (err) => {
            console.log(err);
          },
        });
      } else {
        this.adsService.createAD(adData).subscribe({
          next: (res) => {
            console.log(res);
            this.router.navigate(['/myAds']);
          },
          error: (err) => {
            console.log(err);
          },
        });
      }
    }
  }
  createOtherServiceGroup(): FormGroup {
    return this.fb.group({
      name: [''],
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

  onCancel(): void {
    this.router.navigate(['/home']);
  }
}
