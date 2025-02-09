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

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MessageModule, InputTextModule, SelectModule, IconFieldModule, InputIconModule, PasswordModule,TranslatePipe],
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
  @Input() options: { name: string, code: number }[] = [];


  get formControl(): FormControl {
    return this.formGroup.get(this.controlName) as FormControl;
  }
  get hasError(): boolean {
    return this.formControl.invalid && this.formControl.touched;
  }
}
