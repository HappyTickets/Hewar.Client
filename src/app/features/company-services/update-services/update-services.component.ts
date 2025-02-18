import { Component } from '@angular/core';
import { CompanyServicesService } from '../services/company-services.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalizationService } from '../../../core/services/localization/localization.service';
import { Subscription } from 'rxjs';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';

@Component({
  selector: 'app-update-services',
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
  templateUrl: './update-services.component.html',
  styleUrl: './update-services.component.scss',
})
export class UpdateCompanyServiceComponent {
  serviceForm!: FormGroup;
  private languageSubscription!: Subscription;
  language!: 'ar' | 'en';
  serviceId!: number;
  constructor(
    private fb: FormBuilder,
    private localizationService: LocalizationService,
    private service: CompanyServicesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit() {
    this.serviceId = Number(this.route.snapshot.paramMap.get('id'));

    // Initialize the form
    this.serviceForm = this.fb.group({
      id: [this.route.snapshot.paramMap.get('id')],
      name: ['', Validators.required],
      description: [''],
    });

    // Fetch the existing service data

    this.service.getServiceById(this.serviceId).subscribe((service) => {
      if (service) {
        this.serviceForm.patchValue({
          name: service.data.name,
          description: service.data.description,
        });
      }
    });

    // Listen for language changes
    this.language = this.localizationService.getLanguage();
    this.languageSubscription = this.localizationService.language$.subscribe(
      (lang) => (this.language = lang)
    );
  }

  get name() {
    return this.serviceForm.get('name');
  }

  get description() {
    return this.serviceForm.get('description');
  }

  onSubmit() {
    if (this.serviceForm.valid) {
      this.service.updateService(this.serviceForm.value).subscribe({
        next: () => {
          this.router.navigate(['/companyservices']);
          console.log('Service created successfully');
        },
        error: (err) => console.error('Error creating service', err),
      });
    }
  }

  ngOnDestroy() {
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
  }
}
