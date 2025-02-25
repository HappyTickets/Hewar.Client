import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { TranslatePipe } from '@ngx-translate/core';
import { PasswordService } from '../../services/password.service';


@Component({
  selector: 'app-create-reset-password',
  standalone: true,
  imports: [CardModule, ReactiveFormsModule, ButtonModule, InputComponent, TranslatePipe],
  templateUrl: './create-reset-password.component.html',
  styleUrl: './create-reset-password.component.scss',
})
export class CreateResetPasswordComponent {
  private passwordService = inject(PasswordService);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  resetForm: FormGroup;

  constructor() {
    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }


  onSubmit(): void {
    if (this.resetForm.valid) {
      this.passwordService.createResetPassword(this.resetForm.value.email).subscribe(() => {
          this.router.navigate(['/reset-password']);
      });
    }
  }
}
