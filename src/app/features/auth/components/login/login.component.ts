import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ConfirmEmailComponent } from '../confirm-email/confirm-email.component';
import { ButtonModule } from 'primeng/button';
import { catchError, throwError } from 'rxjs';
import { CardModule } from 'primeng/card';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { passwordValidator } from '../../../../shared/validators/password.validator';
import { emailValidator } from '../../../../shared/validators/email.validator';
import { TranslatePipe } from '@ngx-translate/core';
import { EmailService } from '../../services/email.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ ReactiveFormsModule, ConfirmEmailComponent, ButtonModule, CardModule, RouterModule, InputComponent, TranslatePipe],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  private emailService = inject(EmailService);
  private authService = inject(AuthService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  returnUrl: string | null = null;
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
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.returnUrl = params['returnUrl'] || null;
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
          this.emailService.sendConfirmationEmail(email).subscribe(() => {this.showDialog = true;});
        }
        return throwError(err);
      })).subscribe(() => {
        this.loading = false;
        this.router.navigateByUrl(this.returnUrl || '/home');
      });
    }
  }
  onCloseDialog(): void { this.showDialog = false }
  logout(): void { this.authService.logout() }
  isLoggedIn(): boolean { return this.authService.isLoggedIn();}
}
