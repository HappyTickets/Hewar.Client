import { NgClass } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClientFacadeService } from '../../Services/http-client-facade.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-facility-detalies-one',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, TranslateModule],
  templateUrl: './facility-detalies-one.component.html',
  styleUrl: './facility-detalies-one.component.scss'
})
export class FacilityDetaliesOneComponent implements OnInit {
  private readonly _HttpClientFacadeService = inject(HttpClientFacadeService)
  endPoint: string = 'api/priceRequests/createFacilityDetails';

  constructor(private Router: Router) {}


  FacilityDetaliesForm: FormGroup = new FormGroup({
   


    representativeEmail: new FormControl(null, [Validators.required, Validators.email]),
    representativePhone: new FormControl(null, [
      Validators.required,
      // Validators.pattern(/^\+?(20|212|216|218|220|221|222|223|224|225|226|227|228|229|230|231|232|233|234|235|236|237|238|239|240|241|242|243|244|245|246|247|248|249|961|962|963|964|965|966|967|968|970|971|972|973|974|975|976|977|992)[0-9]{6,12}$/)
    ]),
    representativeNationalId: new FormControl(null, [Validators.required]),

    representativeNationality: new FormControl(null, [Validators.required]),

    representativeNotes: new FormControl(null, [Validators.required]),
    commissionerName: new FormControl(null, [Validators.required]),


    commissionerEmail: new FormControl(null, [Validators.required, Validators.email]),
    commissionerPhone: new FormControl(null, [
      Validators.required,
      // Validators.pattern(/^\+?(20|212|216|218|220|221|222|223|224|225|226|227|228|229|230|231|232|233|234|235|236|237|238|239|240|241|242|243|244|245|246|247|248|249|961|962|963|964|965|966|967|968|970|971|972|973|974|975|976|977|992)[0-9]{6,12}$/)
    ]),
    commissionerNationalId: new FormControl(null, [Validators.required]),

    commissionerNationality: new FormControl(null, [Validators.required]),

    commissionerNotes: new FormControl(null, [Validators.required]),
    priceRequestId: new FormControl(null, [Validators.required]),







  });



  ngOnInit():void {
    const pageOneData = localStorage.getItem('pageOneData')
    if (!pageOneData) {
      alert('يرجى إكمال الصفحة الأولى أولاً.');
      this.Router.navigate(['/page-one']) 
    }
  }



  onSubmit() {
    if (this.FacilityDetaliesForm.valid) {
      const pageOneData = JSON.parse(localStorage.getItem('pageOneData') || '{}');
      const finalData = { ...pageOneData, ...this.FacilityDetaliesForm.value };   
  
      this._HttpClientFacadeService.post<any>(this.endPoint, finalData).subscribe({
        next: (res) => {
          alert('تم الإرسال بنجاح!');
          localStorage.removeItem('pageOneData');
          this.Router.navigate(['/home']);
        },
        error: (err) => {
          console.error('Error: ', err);
        }
      });
  
      console.log('Form Submitted:', finalData);
      this.FacilityDetaliesForm.reset(); 
    } else {
      console.error('Form is invalid');
    }
  }
  
}
