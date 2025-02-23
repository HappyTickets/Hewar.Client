import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { InputComponent } from '../../../../../shared/components/input/input.component';

@Component({
  selector: 'app-create-company-ad-offer',
  standalone: true,
  imports: [
    SelectModule,
    CommonModule,
    InputNumberModule,
    TextareaModule,
    ButtonModule,
    ReactiveFormsModule,
    InputTextModule,
    TranslatePipe,
    TranslatePipe,
    DatePickerModule,
    InputComponent,
  ],
  templateUrl: './create-company-ad-offer.component.html',
  styleUrl: './create-company-ad-offer.component.scss',
})
export class CreateCompanyAdOfferComponent {}
