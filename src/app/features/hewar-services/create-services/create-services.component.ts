import { CommonModule } from '@angular/common';

import { Component, OnInit } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { LocalizationService } from '../../../core/services/localization/localization.service';
import { Subscription } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { HewarServicesComponent } from '../hewar-services.component';
import { HewarServicesService } from '../services/hewar-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-services',
  standalone: true,
  imports: [
    InputTextModule,
    TextareaModule,
    ButtonModule,
    CardModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    TranslateModule,
  ],
  templateUrl: './create-services.component.html',
  styleUrl: './create-services.component.scss',
})
export class CreateServicesComponent implements OnInit {

  serviceForm!: FormGroup;
  private languageSubscription: Subscription;
  language!: 'ar' | 'en';

  constructor(
    private fb: FormBuilder,
    private localizationService: LocalizationService,
    private Service: HewarServicesService,
    private router: Router
  ) {
    this.language = this.localizationService.getLanguage();
    this.languageSubscription = this.localizationService.language$.subscribe(
      (lang) => {
        {
          this.language = lang;
        }
      }
    );
  }

  ngOnInit() {
    this.serviceForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
    });
  }

  onSubmit() {
    if (this.serviceForm.valid) {
      this.Service.CreateService(this.serviceForm.value).subscribe({
        next: () => {
          this.router.navigate(['/get-all-hewar-services']);
          console.log('Service created successfully');
        },
        error: (err) => console.error('Error creating service', err),
      });
      console.log(this.serviceForm.value);

      // Call the API to create the service
    }
  }
}
