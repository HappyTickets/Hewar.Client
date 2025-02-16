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
import { LocalizationService } from '../../../../core/services/localization/localization.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IUpdateAd, AdStatus } from '../../models/iupdate-ad';

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
  adId: number | null = null;

  private fb = inject(FormBuilder);
  private adsService = inject(AdsService);
  private localizationService = inject(LocalizationService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  contractTypes = Object.entries(ContractType)
    .filter(([key]) => isNaN(Number(key)))
    .map(([key, value]) => ({ label: key, value }));
  shiftType = Object.entries(ShiftType)
    .filter(([key]) => isNaN(Number(key)))
    .map(([key, value]) => ({ label: key, value }));

  // shiftType = this.localizationService.createDropdown(ShiftType);
  // contractTypes = this.localizationService.createDropdown(ContractType);

  date = new Date();
  servicesOptions: { label: string; value: number }[] = [];

  constructor() {
    this.createAdForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      contractType: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      services: this.fb.array([this.createServiceGroup()]),
      // otherServices: this.fb.array([this.createOtherServiceGroup()]),
    });
    console.log(this.services);

    this.createAdForm.updateValueAndValidity();
  }

  ngOnInit(): void {
    this.route.params.subscribe((parasm) => {
      if (parasm['id']) {
        this.isEditMode = true;
        this.adId = +parasm['id'];
        this.loadAdData(this.adId);
      }
    });

    this.createAdForm.valueChanges.subscribe(() => {
      console.log('Form Status: ', this.createAdForm.status);
    });

    this.adsService.getHewarServices().subscribe({
      next: (data) => {
        console.log('Data from API:', data);
        this.servicesOptions = data;
      },
      error: (error) => {
        console.error('Error fetching Hewar services:', error);
      },
    });
  }

  loadAdData(adId: number): void {
    this.adsService.getAdById(adId).subscribe({
      next: (ad) => {
        this.createAdForm.patchValue({
          id: ad.data.id,
          title: ad.data.title,
          description: ad.data.description,
          contractType: ad.data.contractType,
          startDate: ad.data.startDate,
          endDate: ad.data.endDate,
        });

        this.services.clear();
        ad.data.services.forEach((service) => {
          this.services.push(
            this.fb.group({
              serviceId: [service.serviceId, Validators.required],
              quantity: [service.quantity, Validators.required],
              sheftType: [service.shiftType, Validators.required],
            })
          );
        });
      },
      error: (err) => {
        console.log(err);
      },
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

  // createOtherServiceGroup(): FormGroup {
  //   return this.fb.group({
  //     name: [''],
  //     quantity: [null, [Validators.required]],
  //     shiftType: ['', [Validators.required]],
  //   });
  // }
  // get otherServices() {
  //   return this.createAdForm.get('otherServices') as FormArray;
  // }

  // addOtherService(): void {
  //   this.otherServices.push(this.createOtherServiceGroup());
  // }
  // removeOtherService(index: number): void {
  //   if (this.otherServices.length > 0) {
  //     this.otherServices.removeAt(index);
  //   }
  // }

  onSubmit(): void {
    this.createAdForm.markAllAsTouched();
    if (this.createAdForm.valid) {
      const adData: ICreateAd  = {
        title: this.createAdForm.value.title,
        description: this.createAdForm.value.description,
        startDate: this.createAdForm.value.startdate,
        endDate: this.createAdForm.value.endDate,
        contractType: this.createAdForm.value.contractType,
        services: this.createAdForm.value.services,
      };

      if (this.isEditMode && this.adId ) {

        const updateAdData: IUpdateAd = {
          ...adData,
          id: this.adId,
          startDate: this.createAdForm.value.startDate,
          status: AdStatus.Active
        };
        this.adsService.updateAd(this.adId, updateAdData).subscribe ({
          next:(res)=>{
           console.log(res)
           this.router.navigate(['/ads'])

          },
          error:(err)=>{
            console.log(err)

          }
        })
      } else {
        this.adsService.createAD(adData).subscribe({
          next:(res)=>{
            console.log(res);
            this.router.navigate(['/ads'])

          },
          error: (err)=> {
            console.log(err);

          }
        })
      }

  //     this.router.navigate(['/ads']);
  //     this.adsService.createAD(adData).subscribe({
  //       next: (response) => {
  //         console.log(response);
  //       },
  //       error: (error) => {
  //         console.log(error);
  //       },
  //     });
    }
  }
  onCancel(): void {
    this.createAdForm.reset();
  }
}
