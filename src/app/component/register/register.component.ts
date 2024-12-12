import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from 'express';
// import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  // private readonly _Router = inject(Router);

  // msgError: string = "";
  // isLoading: boolean = false;
  // msgSuccess: boolean = false;
  
  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^\w{6,}$/)]),
    rePassword: new FormControl(null),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
  },this.confirmPassword);






  registerSubmit():void{
if (this.registerForm.valid) {
  console.log(this.registerForm);

}
  }
  // { validators: this.confirmPassword }
  confirmPassword(g: AbstractControl) {
    if (g.get('password')?.value === g.get('rePassword')?.value) {
      return null;
    } else {
      return { mismatch: true };
    }
  }

  // registerSubmit(): void {
  //   if (this.registerForm.valid) {
  //     this.isLoading = true;
  //     // Simulate a successful registration process
  //     setTimeout(() => {
  //       this.msgSuccess = true;
  //       setTimeout(() => {
  //         this._Router.navigate(['/login']); // Redirect to login page
  //       }, 1000);
  //     }, 1000);
  //   } else {
  //     this.registerForm.markAllAsTouched();
  //     this.msgError = 'Please check the entered data.';
  //     this.isLoading = false;
  //   }
  // }

  // ngOnDestroy(): void {
  //   // Unsubscribe from subscriptions if any
  // }
}
