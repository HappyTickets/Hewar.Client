import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { PasswordModule } from 'primeng/password';
import { TranslatePipe } from '@ngx-translate/core';
import { SelectModule } from 'primeng/select';
import { DatePicker } from 'primeng/datepicker';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MessageModule,
    InputTextModule,
    SelectModule,
    IconFieldModule,
    InputIconModule,
    PasswordModule,
    TranslatePipe,
    DatePicker
  ],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  @Input() label!: string;
  @Input() formGroup!: FormGroup;
  @Input() controlName!: string;
  @Input() placeholder!: string;
  @Input() errorKey!: string;
  @Input() type = 'text';
  @Input() icon!: string;
  @Input() readonly = false;
  @Input() nestedControlName?: string;
  @Input() options: { name: string; code: number }[] = [];

  // For Date
  @Input() minDate: Date = new Date(Date.now());
  @Input() maxDate?: Date;


  get formControl(): FormControl {
    if (this.nestedControlName) {
      const nestedControl = this.formGroup.get(this.controlName)?.get(this.nestedControlName) as FormControl;
      return nestedControl;
    }
    return this.formGroup.get(this.controlName) as FormControl;
  }
  get hasError(): boolean {
    return this.formControl?.invalid && this.formControl.touched;
  }
}
