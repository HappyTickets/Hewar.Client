import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpClientFacadeService } from '../../Services/http-client-facade.service';
import { Router } from 'express';
import { HttpClient } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, TranslateModule , RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private readonly _HttpClientFacadeService = inject(HttpClientFacadeService)
  endPoint: string = 'api/auth/loginCompany';



  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^\w{6,}$/)]),

  });





  loginSubmit() {
    if (this.loginForm.valid) {
      this._HttpClientFacadeService.post<any>(this.endPoint, this.loginForm.value).subscribe({
        next: (res) =>
          console.log('created: ', res),

        error: (err) =>
          console.error('Error: ', err),

      })
      console.log('Form Submitted:', this.loginForm.value)
      this.loginForm.reset()
    } else {
      console.error('Form is invalid')
    }
  }
}

