import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { StepperModule } from 'primeng/stepper';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FileUpload } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ProgressBar } from 'primeng/progressbar';
import { PrimeNG } from 'primeng/config';
import { BadgeModule } from 'primeng/badge';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { MessageModule } from 'primeng/message';
import { Router } from '@angular/router';
import { ImageUploaderComponent } from '../../../shared/components/image-uploader/image-uploader.component';
import { InputComponent } from '../../../shared/components/input/input.component';
import { FloatLabel, FloatLabelModule } from 'primeng/floatlabel';
import { LocalizationService } from '../../../core/services/localization/localization.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { TranslateModule } from '@ngx-translate/core';
import { IftaLabelModule } from 'primeng/iftalabel';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { FacilitiesService } from '../services/facilities.service';

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}
@Component({
  selector: 'app-create-facility',
  standalone: true,
  imports: [
    ButtonModule,
    StepperModule,
    FormsModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    SelectModule,
    InputNumberModule,
    ReactiveFormsModule,
    CommonModule,
    FileUpload,
    ToastModule,
    ProgressBar,
    BadgeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DropdownModule,
    ImageUploaderComponent,
    InputComponent,
    FloatLabel,
    TranslateModule,
    IftaLabelModule,
    IconFieldModule,
    FloatLabelModule,
    InputIconModule,
  ],
  providers: [MessageService],
  templateUrl: './create-facility.component.html',
  styleUrl: './create-facility.component.scss',
})
export class CreateFacilityComponent implements OnInit {
  @ViewChild(ImageUploaderComponent) imageUploader!: ImageUploaderComponent;
  language!: 'ar' | 'en';
  private languageSubscription: Subscription;
  selectedImage: { base64: string; imageUrl: string } | null = null;
  fileUploadError: string = '';
  files: File[] = [];
  uploadedFiles: File[] = [];
  imageName: string = '';
  totalSize: number = 0;
  totalSizePercent: number = 0;
  facilityForm!: FormGroup;

  imagePreview: string | ArrayBuffer | null = null;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private messageService: MessageService,
    private localizationService: LocalizationService,
    private facilityService: FacilitiesService,
    private http: HttpClient
  ) {
    this.language = this.localizationService.getLanguage();
    this.languageSubscription = this.localizationService.language$.subscribe(
      (lang) => {
        {
          this.language = lang;
        }
      }
    );
    // this.facilityForm = this.fb.group({
    //   name: ['', Validators.required],
    //   type: [null, Validators.required],
    //   activityType: [null, Validators.required],
    //   address: ['', Validators.required],
    //   city: ['', Validators.required],
    //   phone: ['', Validators.required],
    //   email: ['', [Validators.required, Validators.email]],
    //   responsibleName: ['', Validators.required],
    //   responsiblePhone: ['', Validators.required],
    //   commercialRegistration: ['', Validators.required],
    //   imageUrl: [''],
    // });
  }
  ngOnInit() {
    this.facilityForm = this.fb.group({
      type: ['', Validators.required],
      name: ['', Validators.required],
      commercialRegistration: ['', Validators.required],
      activityType: ['', Validators.required],
      responsibleName: ['', Validators.required],
      responsiblePhone: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{8,15}$')],
      ],
      address: this.fb.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        country: ['', Validators.required],
        postalCode: ['', Validators.required],
      }),
      adminInfo: this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        phone: ['', Validators.required],
        imageUrl: [''],
      }),
    });

    // التحقق من أن القيمة التي يتم إرسالها هي النص فقط
    this.facilityForm.get('activityType')?.valueChanges.subscribe((value) => {
      console.log('Selected Activity Type:', value); // يجب أن يكون 'E-commerce' أو 'Education' فقط
    });
  }
  validateNumberInput(event: KeyboardEvent) {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault(); // Prevents non-numeric characters
    }
  }
  onImageSelected(imageData: { base64: string; imageUrl: string }) {
    this.selectedImage = imageData;
    this.facilityForm.patchValue({ imageUrl: imageData.imageUrl });
  }

  onSubmit(): void {
    // if (!this.selectedImage) return;
    // console.log('Submitting form:', this.facilityForm.value);
    // const facilityData = this.facilityForm.value;
    // const uploadData = {
    //   path: facilityData.imageUrl,
    //   base64: this.selectedImage.base64,
    // };
    // this.http.post('API_URL_1', facilityData).subscribe(() => {
    //   // بعد نجاح إرسال البيانات، نرفع الصورة للـ API الثانية
    //   this.http.post('API_URL_2', uploadData).subscribe(() => {
    //     console.log('Facility and image uploaded successfully!');
    //   });
    // });
    if (true) {
      this.imageUploader.uploadFiles().subscribe(
        (imageNames) => {
          console.log('Uploaded images:', imageNames);
          this.facilityForm.get('adminInfo.imageUrl')!.setValue(imageNames); // Store image names in form
          // Now submit the form
          this.facilityService
            .createFacility(this.facilityForm.value)
            .subscribe(
              (response) => {
                console.log('Facility created successfully:', response);
              },
              (error) => {
                console.error('Facility creation failed:', error);
                console.log('Uploaded images>>>>>>>>>>>>>>>>:', imageNames);
              }
            );
        },
        (error) => {
          console.error('Image upload failed:', error);
          this.facilityForm.get('adminInfo.imageUrl')!.setValue('imageNames');
          console.log('Submitting form:', this.facilityForm.value);
        }
      );
      console.log('Facility Data:', this.facilityForm.value);
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Facility Created',
      });
      setTimeout(() => {
        this.router.navigate(['/facilities']);
      }, 1500);
    }
  }
  cancel(): void {
    this.router.navigate(['/facilities']);
  }
  handleFileSizeError(errorMessage: string): void {
    this.fileUploadError = errorMessage; // Set error message
  }
  handelimagenam(imageName: string): void {
    this.imageName = imageName; // Set error message
  }
}
