import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { HttpClientFacadeService } from '../../../Services/http-client-facade.service';

@Component({
  selector: 'app-individual-account',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
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
      email: ['', [Validators.required, Validators.email]],
      phone: ['',[Validators.required, Validators.pattern('^[0-9]{10,15}$')]],
      password: ['',[Validators.required,Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
      dateOfBirth: ['', [Validators.required]],
      skills: ['', Validators.required],
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
