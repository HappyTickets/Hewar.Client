import { Component, ElementRef, inject, Input, input, ViewChild } from '@angular/core';
import { HttpClientFacadeService } from '../../Services/http-client-facade.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CdkStepper, STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import {FormBuilder, FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';


@Component({
  selector: 'app-facility-detalies',
  standalone: true,
   providers: [
      {
        provide: STEPPER_GLOBAL_OPTIONS,
        useValue: {showError: true},
      },
    ],
  imports: [ReactiveFormsModule, 
    NgClass, 
    TranslateModule,
      MatStepperModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
  ],
  templateUrl:'./facility-detalies.component.html',
  styleUrl: './facility-detalies.component.scss'
})
export class FacilityDetaliesComponent  {

  private readonly _HttpClientFacadeService = inject(HttpClientFacadeService)
  endPoint: string = 'api/priceRequests/createFacilityDetails';

  // constructor(private Router: Router) {}

 
  FacilityDetaliesForm: FormGroup = new FormGroup({
    facilityName: new FormControl(null, [Validators.required]),
    facilityEmail: new FormControl(null, [Validators.required, Validators.email]),
    facilityPhone: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^\+?(20|212|216|218|220|221|222|223|224|225|226|227|228|229|230|231|232|233|234|235|236|237|238|239|240|241|242|243|244|245|246|247|248|249|961|962|963|964|965|966|967|968|970|971|972|973|974|975|976|977|992)[0-9]{6,12}$/)
    ]),
    facilityAddress: new FormControl(null, [Validators.required]),
    facilitySize: new FormControl(null, [Validators.required]),
   

  });


  FacilityDetaliesCompleteForm: FormGroup = new FormGroup({
    facilityActivityType: new FormControl(null, [Validators.required]),

    facilityCommercialRegistrationNumber: new FormControl(null, [Validators.required]),
    facilityCommercialRegistrationExpiryDate: new FormControl(null, [Validators.required]),
    facilityLicenseNumber: new FormControl(null, [Validators.required]),
    facilityLicenseExpiryDate: new FormControl(null, [Validators.required]),
    facilityNotes: new FormControl(null, [Validators.required]),
  })

  repersentativeDetaliesForm: FormGroup = new FormGroup({
    representativeName: new FormControl(null, [Validators.required]),
    
    representativeEmail: new FormControl(null, [Validators.required, Validators.email]),
    representativePhone: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^\+?(20|212|216|218|220|221|222|223|224|225|226|227|228|229|230|231|232|233|234|235|236|237|238|239|240|241|242|243|244|245|246|247|248|249|961|962|963|964|965|966|967|968|970|971|972|973|974|975|976|977|992)[0-9]{6,12}$/)
    ]),
    representativeNationalId: new FormControl(null, [Validators.required]),

    representativeNationality: new FormControl(null, [Validators.required]),

    representativeNotes: new FormControl(null, [Validators.required]),


  });
  commissionerDetaliesForm: FormGroup = new FormGroup({
    commissionerName: new FormControl(null, [Validators.required]),


    commissionerEmail: new FormControl(null, [Validators.required, Validators.email]),
    commissionerPhone: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^\+?(20|212|216|218|220|221|222|223|224|225|226|227|228|229|230|231|232|233|234|235|236|237|238|239|240|241|242|243|244|245|246|247|248|249|961|962|963|964|965|966|967|968|970|971|972|973|974|975|976|977|992)[0-9]{6,12}$/)
    ]),
    commissionerNationalId: new FormControl(null, [Validators.required]),

    commissionerNationality: new FormControl(null, [Validators.required]),

    commissionerNotes: new FormControl(null, [Validators.required]),
    priceRequestId: new FormControl(null, [Validators.required]),

  });
  isStepValid(stepIndex: number): boolean {
    switch (stepIndex) {
      case 0:
        return this.FacilityDetaliesForm.valid;
      case 1:
        return this.FacilityDetaliesCompleteForm.valid;
        case 2:
          return this.repersentativeDetaliesForm.valid;
          case 3:
            return this.commissionerDetaliesForm.valid;
      default:
        return false;
    }
  }
  // saveData() {
  //   if (this. FacilityDetaliesForm.valid) {
  //     const pageOneData = this.FacilityDetaliesForm.value;
  //     localStorage.setItem('pageOneData', JSON.stringify(pageOneData));
  //     // this.Router.navigate(['/FacilityDetailes/FacilityDetailesOne']);

  //   } else {
  //     alert('يرجى إكمال جميع الحقول.');
  //   }
  // }
//   onFinish() {
//     console.log('Data:', {
//       step1: this.FacilityDetaliesForm.value,
//       step2: this.FacilityDetaliesCompleteForm.value,
//       step3: this.repersentativeDetaliesForm.value,

//       step4: this.commissionerDetaliesForm.value,

//     });
//   }
//
onFinish() {
  if (
    this.FacilityDetaliesForm.valid &&
    this.FacilityDetaliesCompleteForm.valid &&
    this.repersentativeDetaliesForm.valid &&
    this.commissionerDetaliesForm.valid
  ) {
    const data = {
      ...this.FacilityDetaliesForm.value,
      ...this.FacilityDetaliesCompleteForm.value,
      ...this.repersentativeDetaliesForm.value,
      ...this.commissionerDetaliesForm.value,
    };

    this._HttpClientFacadeService.post(this.endPoint, data).subscribe(
      (response) => {
        console.log('Success:', response);
        alert('Data submitted successfully!');
        // يمكنك إعادة توجيه المستخدم أو إعادة تعيين النماذج هنا
      },
      (error) => {
        console.error('Error:', error);
        alert('Failed to submit data. Please try again.');
      }
    );
  } else {
    alert('Please complete all required fields.');
  }
}

 }