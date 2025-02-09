import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, inject } from '@angular/core';
import { Cities } from '../../../../shared/enums/cities';
import { Qualifications } from '../../../../shared/enums/qualification-type';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { AuthService } from '../../services/auth.service';
import { ConfirmEmailComponent } from '../confirm-email/confirm-email.component';
import { emailValidator } from '../../../../shared/validators/email.validator';
import { adultValidator } from '../../../../shared/validators/age.validator';
import { heightValidator } from '../../../../shared/validators/height.validator';
import { weightValidator } from '../../../../shared/validators/weight.validator';
import { passwordValidator } from '../../../../shared/validators/password.validator';
import { CheckboxModule } from 'primeng/checkbox';
import { TranslatePipe } from '@ngx-translate/core';
import { IRegisterGuard } from '../../models/register/IRegister-guard';
import { CardModule } from 'primeng/card';
import { BloodType } from '../../../../shared/enums/blood-type';
import { LocalizationService } from '../../../../core/services/localization/localization.service';

@Component({
  selector: 'app-register-guard',
  standalone: true,
  imports: [ ReactiveFormsModule, ConfirmEmailComponent, InputComponent, CheckboxModule, TranslatePipe,CardModule ],
  templateUrl: './register-guard.component.html',
  styleUrl: './register-guard.component.scss',
})
export class RegisterGuardComponent {
  private localizationService = inject(LocalizationService);
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  cities = this.localizationService.createDropdown(Cities);
  qualifications = this.localizationService.createDropdown(Qualifications);
  bloodType = this.localizationService.createDropdown(BloodType);

  registerForm: FormGroup;
  showDialog = false;
  checked = false;
  email = '';
  password = '';
  constructor() {
    this.registerForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, emailValidator()]],
      phone: ['', [Validators.required]],
      password: ['', [Validators.required, passwordValidator()]],
      confirmPassword: ['',[Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      imageUrl: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required, adultValidator()]],
      nationalId: ['', [Validators.required]],
      qualification: [null, [Validators.required]],
      // address
      street: ['', [Validators.required]],
      city: [null, [Validators.required]],
      state: ['', [Validators.required]],
      country: ['', [Validators.required]],
      postalCode: ['', [Validators.required]],

      bloodType: [null, [Validators.required]],
      height: ['', [Validators.required, heightValidator()]],
      weight: ['', [Validators.required, weightValidator()]],
      skills: ['', [Validators.required]],
      prevCompanies: ['', [Validators.required]],
      acceptTerms: [false, Validators.requiredTrue],
    });
  }
  register(): void {
    if (this.registerForm.valid) {
      const companyData: IRegisterGuard = {
        userName: this.registerForm.value.userName,
        email: this.registerForm.value.email,
        phone: this.registerForm.value.phone,
        password: this.registerForm.value.password,
        firstName: this.registerForm.value.firstName,
        lastName: this.registerForm.value.lastName,
        imageUrl: this.registerForm.value.imageUrl,
        dateOfBirth: this.registerForm.value.dateOfBirth,
        nationalId: this.registerForm.value.nationalId,
        qualification: +this.registerForm.value.qualification,
        city: +this.registerForm.value.city,
        address: {
          street: this.registerForm.value.street,
          city: this.registerForm.value.city,
          state: this.registerForm.value.state,
          country: this.registerForm.value.country,
          postalCode: this.registerForm.value.postalCode,
        },
        bloodType: +this.registerForm.value.bloodType,
        height: this.registerForm.value.height,
        weight: this.registerForm.value.weight,
        skills: [
          {
            name: this.registerForm.value.skills,
            yearsOfExperience: 2,
          },
        ],
        prevCompanies: [
          {
            name: this.registerForm.value.prevCompanies,
            from: new Date('2022-02-03T16:51:00.386Z'),
            to: new Date('2024-02-03T16:51:00.386Z'),
          },
        ],
      };
      this.authService.registerGuard(companyData).subscribe(() => {
        this.email = companyData.email;
        this.password = companyData.password;
        this.showDialog = true;
      });
    }
  }
  onCloseDialog(): void {
    this.showDialog = false;
  }
}
