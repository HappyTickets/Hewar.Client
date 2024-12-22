
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { HttpClientFacadeService } from '../../Services/http-client-facade.service';
import { NgClass } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-price-request',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, TranslateModule],
  templateUrl: './price-request.component.html',
  styleUrl: './price-request.component.scss'
})
export class PriceRequestComponent {
  private readonly _HttpClientFacadeService = inject(HttpClientFacadeService);
  endPoint: string = 'api/auth/priceRequest';
  // today!: string;
  today: string = new Date().toISOString().split('T')[0]; // تعيين تاريخ اليوم

  priceRequestForm: FormGroup = new FormGroup({
    securityRole: new FormControl(null, [Validators.required]),
    guardsCount: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]+$/)]),
    workShift: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]+$/)]),
    contractType: new FormControl(null, [Validators.required]),
    startDate: new FormControl(this.today, [Validators.required]),
    endDate: new FormControl(null, [Validators.required, this.validateEndDate.bind(this)]),
  
    // endDate: [null, [Validators.required, this.validateEndDate.bind(this)]],

    description: new FormControl(null, [Validators.required]),
    companyId: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]+$/)])
  });
  // الفاليديشن الخاص بنهاية التاريخ
  private validateEndDate(control: AbstractControl): ValidationErrors | null {
    const startDate = this.priceRequestForm?.get('startDate')?.value;
    const endDate = control.value;

    if (startDate && endDate && new Date(endDate) < new Date(startDate)) {
      return { invalidEndDate: true };
    }
    return null;
  }
  // private validateEndDate(control: AbstractControl): ValidationErrors | null {
  //   const startDate = this.priceRequestForm?.get('startDate')?.value;
  //   const endDate = control.value;

  //   if (startDate && endDate && new Date(endDate) < new Date(startDate)) {
  //     return { invalidEndDate: true }; 
  //   }
  //   return null; 
  // }

  onSubmit(): void {
    if (this.priceRequestForm.valid) {
      this._HttpClientFacadeService.post<any>(this.endPoint, this.priceRequestForm.value).subscribe({
        next: (res) => console.log('Created: ', res),
        error: (err) => console.error('Error: ', err),
      });
      console.log('Form Submitted:', this.priceRequestForm.value);
      this.priceRequestForm.reset();
    } else {
      console.error('Form is invalid');
    }
  }
}
