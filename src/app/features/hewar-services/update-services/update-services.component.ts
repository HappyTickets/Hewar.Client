import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormsModule,
  Validators,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { Subscription } from 'rxjs';
import { LocalizationService } from '../../../core/services/localization/localization.service';
import { HewarServicesService } from '../services/hewar-services.service';
import { ActivatedRoute, Router } from '@angular/router';

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
export class UpdateServicesComponent {
  serviceForm!: FormGroup;
  private languageSubscription!: Subscription;
  language!: 'ar' | 'en';
  serviceId!: number;

  constructor(
    private fb: FormBuilder,
    private localizationService: LocalizationService,
    private service: HewarServicesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.serviceId = Number(this.route.snapshot.paramMap.get('id'));

    // Initialize the form
    this.serviceForm = this.fb.group({
      id: [this.route.snapshot.paramMap.get('id')],
      name: ['', Validators.required],
      description: ['', Validators.required],
    });

    // Fetch the existing service data
    this.service.getServiceById(this.serviceId).subscribe((service) => {
      this.serviceForm.patchValue(service);
    });
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
          this.router.navigate(['/get-all-hewar-services']);
          console.log('Service updated successfully');
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
