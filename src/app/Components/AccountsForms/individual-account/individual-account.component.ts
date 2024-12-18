import { CommonModule } from '@angular/common';
import { Component  } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientFacadeService } from '../../../Services/http-client-facade.service';
import { RegexPatterns } from '../../../regex-patterns';
import { CustomValidators } from '../../../custom-validators';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';


@Component({
  selector: 'app-individual-account',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, 
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
  ],
  templateUrl: './individual-account.component.html',
  styleUrl: './individual-account.component.scss'
})
export class IndividualAccountComponent {
  userForm!: FormGroup;
  endPoint:string='api/auth/registerGuard';

  constructor(private fb: FormBuilder, private httpClientFacadeService:HttpClientFacadeService) {}

  ngOnInit() {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email, Validators.pattern(RegexPatterns.email)]],
      phone: ['',[Validators.required, Validators.pattern(RegexPatterns.phoneNumber)]],
      password: ['',[Validators.required,Validators.minLength(8), Validators.pattern(RegexPatterns.password)]],
      confirmPassword: [{ value: '', disabled: true }, Validators.required],
      dateOfBirth: ['', [Validators.required]],
      skills: ['', Validators.required],
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


  validateDate(control: any) {
    const inputDate = new Date(control.value);
    const today = new Date();
    if (isNaN(inputDate.getTime()) || inputDate >= today) {
      return { invalidDate: true };
    }
    return null; 
  }

  // get skills() {
  //   return this.userForm.get('skills') as FormArray;
  // }

  // addSkill() {
  //   this.skills.push(this.fb.control('', Validators.required));
  // }

  // removeSkill(index: number) {
  //   this.skills.removeAt(index);
  // }

  onSubmit() {
    console.log('Form Submitted:', this.userForm.value);
    if (this.userForm.valid) {
      this.httpClientFacadeService.post<any>(this.endPoint, this.userForm.value).subscribe({
        next: (response) => {
          console.log('created: ', response)
          this.userForm.reset()
        },
        error: (err) => console.error('Error creating : ', err),
      })
    } else {
      console.error('Form is invalid');
    }
  }

}
