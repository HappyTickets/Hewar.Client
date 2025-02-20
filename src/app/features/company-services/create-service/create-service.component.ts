import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { Subscription } from 'rxjs';
import { CompanyServicesService } from '../services/company-services.service';
import { LocalizationService } from '../../../core/services/localization/localization.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-service',
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
  templateUrl: './create-service.component.html',
  styleUrl: './create-service.component.scss',
})
export class CreateServiceComponent implements OnInit {
  serviceForm!: FormGroup;
  private languageSubscription: Subscription;
  language!: 'ar' | 'en';
  constructor(
    private fb: FormBuilder,
    private localizationService: LocalizationService,
    private Service: CompanyServicesService,
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
      this.Service.createService(this.serviceForm.value).subscribe({
        next: () => {
          this.router.navigate(['/companyservices']);
          console.log('Service created successfully');
        },
        error: (err) => console.error('Error creating service', err),
      });
      // Call the API to create the service
    }
  }
}
