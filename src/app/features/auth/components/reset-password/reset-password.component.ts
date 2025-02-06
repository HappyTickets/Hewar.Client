import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [ ReactiveFormsModule, ButtonModule, InputComponent, TranslatePipe, CardModule ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private toastr = inject(ToastrService);

  resetForm: FormGroup;
  constructor() {
    this.resetForm = this.fb.group({
      token: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmNewPassword: ['', [Validators.required]],
    });
  }
  onSubmit(): void {
    if (this.resetForm.valid) {
      if (this.resetForm.value.newPassword !== this.resetForm.value.confirmNewPassword) {
        this.toastr.error('Passwords do not match!', 'Error');
        return;
      }
      this.authService.resetPassword(this.resetForm.value).subscribe();
    }
  }

}
