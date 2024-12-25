import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { RegexPatterns } from '../../../regex-patterns';
import { CustomValidators } from './../../../custom-validators';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { TranslateModule } from '@ngx-translate/core';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { FormsService } from '../../../Services/forms.service';

@Component({
  selector: 'app-company-account',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    TranslateModule, 
    MatSelectModule, 
    MatIconModule, 
    MatFormFieldModule, 
    NgxIntlTelInputModule, 
    MatInputModule
  ],
templateUrl: './company-account.component.html',
  styleUrl: './company-account.component.scss'
})
export class CompanyAccountComponent {
 userForm!: FormGroup;
//  endPoint:string='api/auth/registerCompany';
  constructor(private fb: FormBuilder, private formsService:FormsService) {}

  ngOnInit() {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email, Validators.pattern(RegexPatterns.email)]],
      phone: ['',[Validators.required, Validators.pattern(RegexPatterns.phoneNumber)]],
      countryCode: ['+20', Validators.required], 

      password: ['',[Validators.required,Validators.minLength(8), Validators.pattern(RegexPatterns.password)]],
      confirmPassword: [{ value: '', disabled: true }, Validators.required],
      address: ['', Validators.required],
    },
        {
          validators: CustomValidators.mustMatch('password', 'confirmPassword'),
        }
    );

    this.userForm.get('password')?.statusChanges.subscribe((status) => {
      const confirmPasswordControl = this.userForm.get('confirmPassword');
      if (status === 'VALID') {
        confirmPasswordControl?.enable();
      } else {
        confirmPasswordControl?.disable();
        confirmPasswordControl?.reset();
      }
    });

    this.syncPhoneWithCountryCode();

  }

  syncPhoneWithCountryCode() {
    this.userForm.get('countryCode')?.valueChanges.subscribe((selectedCode) => {
      const currentPhone = this.userForm.get('phone')?.value || '';
      const updatedPhone = `${selectedCode} ${currentPhone.replace(/^\+\d+\s*/, '')}`;
      this.userForm.patchValue({ phone: updatedPhone });
    });
  }
  
  get countryCode() {
    return this.userForm.get('countryCode')?.value;
  }
  countries = [
    { name: 'Saudi Arabia', code: '+966', flag: 'https://flagcdn.com/sa.svg' },
    { name: 'United Arab Emirates', code: '+971', flag: 'https://flagcdn.com/ae.svg' },
    { name: 'Qatar', code: '+974', flag: 'https://flagcdn.com/qa.svg' },
    { name: 'Kuwait', code: '+965', flag: 'https://flagcdn.com/kw.svg' },
    { name: 'Oman', code: '+968', flag: 'https://flagcdn.com/om.svg' },
    { name: 'Bahrain', code: '+973', flag: 'https://flagcdn.com/bh.svg' },
    { name: 'United States', code: '+1', flag: 'https://flagcdn.com/us.svg' },
    { name: 'United Kingdom', code: '+44', flag: 'https://flagcdn.com/gb.svg' },
    { name: 'Canada', code: '+1', flag: 'https://flagcdn.com/ca.svg' },
    { name: 'India', code: '+91', flag: 'https://flagcdn.com/in.svg' },
    { name: 'Australia', code: '+61', flag: 'https://flagcdn.com/au.svg' },
    { name: 'Germany', code: '+49', flag: 'https://flagcdn.com/de.svg' },
    { name: 'France', code: '+33', flag: 'https://flagcdn.com/fr.svg' },
    { name: 'Egypt', code: '+20', flag: 'https://flagcdn.com/eg.svg' },
    { name: 'Brazil', code: '+55', flag: 'https://flagcdn.com/br.svg' },
    { name: 'Japan', code: '+81', flag: 'https://flagcdn.com/jp.svg' },
    { name: 'China', code: '+86', flag: 'https://flagcdn.com/cn.svg' },
    { name: 'Mexico', code: '+52', flag: 'https://flagcdn.com/mx.svg' },
    { name: 'Russia', code: '+7', flag: 'https://flagcdn.com/ru.svg' },
    { name: 'South Korea', code: '+82', flag: 'https://flagcdn.com/kr.svg' },
    { name: 'Saudi Arabia', code: '+966', flag: 'https://flagcdn.com/sa.svg' },
    { name: 'South Africa', code: '+27', flag: 'https://flagcdn.com/za.svg' },
    { name: 'Italy', code: '+39', flag: 'https://flagcdn.com/it.svg' },
    { name: 'Spain', code: '+34', flag: 'https://flagcdn.com/es.svg' },
    { name: 'Turkey', code: '+90', flag: 'https://flagcdn.com/tr.svg' },
    { name: 'Argentina', code: '+54', flag: 'https://flagcdn.com/ar.svg' },
  ];

  onSubmit() {
    if (this.userForm.valid) {
      this.formsService.create('registerCompany', this.userForm.value).subscribe({
        next: (response) => console.log('created: ', response),
        error: (err) => console.error('Error creating : ', err),
      })
      console.log('Form Submitted:', this.userForm.value);
      this.userForm.reset()
    } else {
      console.error('Form is invalid');
    }
  }
}
