import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { HttpClientFacadeService } from '../../../Services/http-client-facade.service';

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
      email: ['', [Validators.required, Validators.email]],
      phone: [ '', [Validators.required, Validators.pattern('^[0-9]{10,15}$')]],
      address: ['', Validators.required],
      password: ['',[
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/), 
        ],
      ],
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
