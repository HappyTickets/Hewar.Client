import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule,} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ConfirmEmailComponent } from '../confirm-email/confirm-email.component';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { ButtonModule } from 'primeng/button';
import { emailValidator } from '../../../../shared/validators/email.validator';
import { passwordValidator } from '../../../../shared/validators/password.validator';
import { CheckboxModule } from 'primeng/checkbox';
import { TranslatePipe } from '@ngx-translate/core';
import { IRegisterFacility } from '../../models/register/iregister-facility';
import { CardModule } from 'primeng/card';
import { Cities } from '../../../../shared/enums/cities';
import { LocalizationService } from '../../../../core/services/localization/localization.service';

@Component({
  selector: 'app-register-facility',
  standalone: true,
  imports: [ ReactiveFormsModule, ConfirmEmailComponent, ButtonModule, InputComponent, CheckboxModule, TranslatePipe, CardModule],
  templateUrl: './register-facility.component.html',
  styleUrl: './register-facility.component.scss',
})
export class RegisterFacilityComponent {
  private localizationService = inject(LocalizationService);
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);

  cities = this.localizationService.createDropdown(Cities);registerForm: FormGroup;
  showDialog = false;
  checked = false;
  email = '';
  password = '';

  constructor() {
    this.registerForm = this.fb.group({
      type: ['', [Validators.required]],
      name: ['', [Validators.required]],
      commercialRegistration: ['', [Validators.required]],
      activityType: ['', [Validators.required]],
      responsibleName: ['', [Validators.required]],
      responsiblePhone: ['', [Validators.required]],
      logo: ['', [Validators.required]],
      // admin
      email: ['', [Validators.required, emailValidator()]],
      password: ['',[Validators.required, Validators.minLength(6), passwordValidator()]],
      confirmPassword: ['',[Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      imageUrl: ['', [Validators.required]],
      // address
      street: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      country: ['', [Validators.required]],
      postalCode: ['', [Validators.required]],
      acceptTerms: [false, Validators.requiredTrue],
    });
  }

  register(): void {
    if (this.registerForm.valid) {
      const companyData: IRegisterFacility = {
        type: this.registerForm.value.type,
        name: this.registerForm.value.name,
        commercialRegistration: this.registerForm.value.commercialRegistration,
        activityType: this.registerForm.value.activityType,
        responsibleName: this.registerForm.value.responsibleName,
        responsiblePhone: this.registerForm.value.responsiblePhone,
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
      this.authService.registerFacility(companyData).subscribe(() => {
        this.showDialog = true;
        this.email = this.registerForm.value.email;
        this.password = this.registerForm.value.password;
      });
    }
  }
  onCloseDialog(): void {
    this.showDialog = false;
  }
}
