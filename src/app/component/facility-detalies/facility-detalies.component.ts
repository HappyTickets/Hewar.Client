import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { HttpClientFacadeService } from '../../Services/http-client-facade.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-facility-detalies',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, TranslateModule],
  templateUrl: './facility-detalies.component.html',
  styleUrl: './facility-detalies.component.scss'
})
export class FacilityDetaliesComponent {
  private readonly _HttpClientFacadeService = inject(HttpClientFacadeService)
  endPoint: string = 'api/priceRequests/createFacilityDetails';
   currentStep: number = 1;

  constructor(private Router: Router) {}

 
  FacilityDetaliesForm: FormGroup = new FormGroup({
    facilityName: new FormControl(null, [Validators.required]),
    facilityEmail: new FormControl(null, [Validators.required, Validators.email]),
    facilityPhone: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^\+?(20|212|216|218|220|221|222|223|224|225|226|227|228|229|230|231|232|233|234|235|236|237|238|239|240|241|242|243|244|245|246|247|248|249|961|962|963|964|965|966|967|968|970|971|972|973|974|975|976|977|992)[0-9]{6,12}$/)
    ]),
    facilityAddress: new FormControl(null, [Validators.required]),
    facilitySize: new FormControl(null, [Validators.required]),
    facilityActivityType: new FormControl(null, [Validators.required]),

    facilityCommercialRegistrationNumber: new FormControl(null, [Validators.required]),
    facilityCommercialRegistrationExpiryDate: new FormControl(null, [Validators.required]),
    facilityLicenseNumber: new FormControl(null, [Validators.required]),
    facilityLicenseExpiryDate: new FormControl(null, [Validators.required]),
    facilityNotes: new FormControl(null, [Validators.required]),
    representativeName: new FormControl(null, [Validators.required]),








  });
 
  saveData() {
    if (this. FacilityDetaliesForm.valid) {
      const pageOneData = this.FacilityDetaliesForm.value;
      localStorage.setItem('pageOneData', JSON.stringify(pageOneData));
      this.Router.navigate(['/FacilityDetailes/FacilityDetailesOne']);

    } else {
      alert('يرجى إكمال جميع الحقول.');
    }
  }

}
