import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ConfirmEmailComponent } from '../confirm-email/confirm-email.component';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { emailValidator } from '../../../../shared/validators/email.validator';
import { passwordValidator } from '../../../../shared/validators/password.validator';
import { TranslatePipe } from '@ngx-translate/core';
import { IRegisterCompany } from '../../models/register/iregister-company';
import { CardModule } from 'primeng/card';
import { Cities } from '../../../../shared/enums/cities';
import { CommonModule } from '@angular/common';
import { LocalizationService } from '../../../../core/services/localization/localization.service';
@Component({
  selector: 'app-register-company',
  standalone: true,
  imports: [ CardModule, ReactiveFormsModule, ConfirmEmailComponent, ButtonModule, InputComponent, CheckboxModule, TranslatePipe, CommonModule ],
  templateUrl: './register-company.component.html',
  styleUrl: './register-company.component.scss',
})
export class RegisterCompanyComponent {
  private localizationService = inject(LocalizationService);
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  cities = this.localizationService.createDropdown(Cities);
  registerForm: FormGroup;
  loading = false;
  checked = false;
  showDialog = false;
  email = '';
  password = '';

  constructor() {
    this.registerForm = this.fb.group({
      contactEmail: ['', [Validators.required, emailValidator()]],
      phoneNumber: ['', [Validators.required]],
      registrationNumber: ['', [Validators.required]],
      taxId: ['', [Validators.required]],
      name: ['', [Validators.required]],
      logo: ['', [Validators.required]],
      // admin
      email: ['', [Validators.required, emailValidator()]],
      password: ['',[Validators.required, Validators.minLength(6), passwordValidator()],],
      confirmPassword: ['',[Validators.required],],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      imageUrl: ['', [Validators.required]],
      // address
      street: ['', [Validators.required]],
      city: [0, [Validators.required]],
      state: ['', [Validators.required]],
      country: ['', [Validators.required]],
      postalCode: ['', [Validators.required]],
      acceptTerms: [false, Validators.requiredTrue],
    });

  }
  register(): void {
    this.loading = true;
    if (this.registerForm.valid) {
      const companyData: IRegisterCompany = {
        name: this.registerForm.value.name,
        contactEmail: this.registerForm.value.email,
        phoneNumber: this.registerForm.value.phoneNumber,
        registrationNumber: this.registerForm.value.registrationNumber,
        taxId: this.registerForm.value.taxId,
        logo: this.registerForm.value.logo,

        adminInfo: {
          email: this.registerForm.value.email,
          password: this.registerForm.value.password,
          firstName: this.registerForm.value.firstName,
          lastName: this.registerForm.value.lastName,
          phone: this.registerForm.value.phone,
          imageUrl: this.registerForm.value.imageUrl,
        },
        address: {
          street: this.registerForm.value.street,
          city: ""+this.registerForm.value.city,
          state: this.registerForm.value.state,
          country: this.registerForm.value.country,
          postalCode: this.registerForm.value.postalCode,
        },
      };
      this.authService.registerCompany(companyData).subscribe(() => {
        this.email = companyData.adminInfo.email;
        this.password = companyData.adminInfo.password;
        this.showDialog = true;
        this.loading = false;
      });
    }
    this.loading = false;

  }
  onCloseDialog(): void {
    this.showDialog = false;
  }
}
