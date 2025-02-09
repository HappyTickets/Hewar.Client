import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [ ReactiveFormsModule, ButtonModule, CardModule, InputComponent, TranslatePipe],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss',
})
export class ChangePasswordComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private toastr = inject(ToastrService);

  changeForm: FormGroup;

  constructor() {
    this.changeForm = this.fb.group({
      oldPassword: [''],
      newPassword: [''],
      confirmNewPassword: ['']
    });
  }

  onSubmit(): void {
    if (this.changeForm.value.newPassword !== this.changeForm.value.confirmNewPassword) {
      this.toastr.error('Passwords do not match!', 'Error');
      return;
    }

    this.authService.changePassword(this.changeForm.value).subscribe(() => {
      this.changeForm.reset();
    });
  }

}
