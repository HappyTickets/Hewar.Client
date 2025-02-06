import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ConfirmEmailComponent } from '../confirm-email/confirm-email.component';
import { ButtonModule } from 'primeng/button';
import { catchError, throwError } from 'rxjs';
import { CardModule } from 'primeng/card';
import { RouterModule } from '@angular/router';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { passwordValidator } from '../../../../shared/validators/password.validator';
import { emailValidator } from '../../../../shared/validators/email.validator';
import { TranslatePipe } from '@ngx-translate/core';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ ReactiveFormsModule, ConfirmEmailComponent, ButtonModule, CardModule, RouterModule, InputComponent, TranslatePipe],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  loginForm: FormGroup;
  showDialog = false;
  loading = false;
  confirmationCode = '';
  email = '';
  password = '';

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, emailValidator()]],
      password: ['', [Validators.required, passwordValidator()]],
    });
  }

  login(): void {
    if (this.loginForm.valid) {
      this.loading = true;
      const { email, password } = this.loginForm.value;

      this.authService.login({ email, password }).pipe(catchError((err) => {
        this.loading = false;
        if (err.status === 401) {
          this.email = email;
          this.password = password;
          this.authService.sendConfirmationEmail(email).subscribe(() => {
            this.showDialog = true;
          });
        }
        return throwError(err);
      })).subscribe(() => {
        this.loading = false;
        this.loginForm.reset();
      });
    }
  }
  onCloseDialog(): void { this.showDialog = false }
  logout(): void { this.authService.logout() }
  isLoggedIn(): boolean { return this.authService.isLoggedIn() }

}
