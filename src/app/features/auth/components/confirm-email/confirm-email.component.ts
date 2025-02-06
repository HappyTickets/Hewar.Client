import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { InputOtp } from 'primeng/inputotp';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-confirm-email',
  standalone: true,
  imports: [FormsModule, DialogModule, InputTextModule, ButtonModule, FormsModule, InputOtp, TranslatePipe],
  templateUrl: './confirm-email.component.html',
  styleUrl: './confirm-email.component.scss',
})
export class ConfirmEmailComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  @Input() showDialog = false;
  @Input() password = '';
  @Input() email = '';
  confirmationCode = '';
  @Output() closeDialog = new EventEmitter<void>();
  lang: 'ar' | 'en' = 'en';

  onConfirm(): void {
    if (this.confirmationCode && this.email) {
      this.authService.confirmEmail({ verificationCode: this.confirmationCode, email: this.email }).subscribe(() => {
          this.onCancel();
          this.loginAfterVerification();
          this.router.navigate(['/login']);
      });
    }
  }
  private loginAfterVerification(): void {
    this.authService.login({ email: this.email, password: this.password }).subscribe();
  }
  onCancel(): void {this.closeDialog.emit(); }
  resentVerificationCode(): void {
    this.authService.sendConfirmationEmail(this.email).subscribe();
  }
}
