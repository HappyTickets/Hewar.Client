import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { HttpClientFacadeService } from '../../../Services/http-client-facade.service';
import { RegexPatterns } from '../../../regex-patterns';
import { CustomValidators } from './../../../custom-validators';

@Component({
  selector: 'app-company-account',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
templateUrl: './company-account.component.html',
  styleUrl: './company-account.component.scss'
})
export class CompanyAccountComponent {
 userForm!: FormGroup;
 endPoint:string='api/auth/registerCompany';
  constructor(private fb: FormBuilder, private httpClientFacadeService:HttpClientFacadeService) {}

  ngOnInit() {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email, Validators.pattern(RegexPatterns.email)]],
      phone: ['',[Validators.required, Validators.pattern(RegexPatterns.phoneNumber)]],
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
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.httpClientFacadeService.post<any>(this.endPoint, this.userForm.value).subscribe({
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
