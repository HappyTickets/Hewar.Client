import { Component, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
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
    MessageModule,
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
  addressGroup!: FormGroup;
  createCompForm!: FormGroup;
  adminInfoGroup!: FormGroup;

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
  }
  fcilityDataInputs = [
    {
      placeholder: 'create-update-facility.namePlaceholder',
      errorKey: 'create-update-facility.nameError',
      controlName: 'name',
      icon: 'pi-user',
      type: 'text',
      label: 'create-update-facility.name',
    },
    {
      placeholder: 'create-update-facility.activityTypePLaceHolder',
      errorKey: 'create-update-facility.activityTypeErr',
      controlName: 'activityType',
      icon: 'pi-envelope',
      type: 'text',
      label: 'create-update-facility.activityType',
    },
    {
      placeholder: 'create-update-facility.typePlaceholder',
      errorKey: 'create-update-facility.typeError',
      controlName: 'type',
      icon: 'pi-envelope',
      type: 'text',
      label: 'create-update-facility.type',
    },
    {
      placeholder: 'create-update-facility.registrationNumberPlaceholder',
      errorKey: 'create-update-facility.registrationNumberError',
      controlName: 'commercialRegistration',
      icon: 'pi-pen-to-square',
      type: 'text',
      label: 'create-update-facility.registrationNumber',
    },
    {
      placeholder: 'create-update-facility.responsibleNamePlaceholder',
      errorKey: 'create-update-facility.responsibleNameErr',
      controlName: 'responsibleName',
      icon: 'pi-pen-to-square',
      type: 'text',
      label: 'create-update-facility.responsibleName',
    },
    {
      placeholder: 'create-update-facility.phoneNumberPlaceholder',
      errorKey: 'create-update-facility.phoneNumberError',
      controlName: 'responsiblePhone',
      icon: 'pi-phone',
      type: 'text',
      label: 'create-update-facility.phoneNumber',
    },
  ];
  adminDataInputs = [
    {
      placeholder: 'create-update-facility.emailPlaceholder',
      errorKey: 'create-update-facility.emailError',
      controlName: 'email',
      icon: 'pi-envelope',
      type: 'email',
      label: 'create-update-facility.email',
    },
    {
      placeholder: 'create-update-facility.passwordPlaceholder',
      errorKey: 'create-update-facility.passwordError',
      controlName: 'password',
      icon: 'pi-lock',
      type: 'password',
      label: 'create-update-facility.password',
    },
    {
      placeholder: 'create-update-facility.confirmPasswordPlaceholder',
      errorKey: 'create-update-facility.confirmPasswordError-2',
      controlName: 'confirmPassword',
      icon: 'pi-lock',
      type: 'password',
      label: 'create-update-facility.confirmPassword',
    },

    {
      placeholder: 'create-update-facility.firstName',
      errorKey: 'create-update-facility.firstName',
      controlName: 'firstName',
      icon: 'pi-user',
      type: 'text',
      label: 'create-update-facility.lastName',
    },
    {
      placeholder: 'create-update-facility.lastNamePlaceholder',
      errorKey: 'create-update-facility.lastNameError',
      controlName: 'lastName',
      icon: 'pi-user',
      type: 'text',
      label: 'create-update-facility.lastName',
    },
    {
      placeholder: 'create-update-facility.phonePlaceholder',
      errorKey: 'create-update-facility.phoneError',
      controlName: 'phone',
      icon: 'pi-phone',
      type: 'text',
      label: 'create-update-facility.phone',
    },
  ];
  addressDataInputs = [
    {
      placeholder: 'title',
      errorKey: 'create-update-facility.streetError',
      controlName: 'street',
      icon: 'pi-map-marker',
      type: 'text',
      label: 'create-update-facility.street',
    },
    {
      placeholder: 'create-update-facility.cityPlaceholder',
      errorKey: 'create-update-facility.cityError',
      controlName: 'city',
      icon: 'pi-map-marker',
      type: 'text',
      label: 'create-update-facility.city',
    },
    {
      placeholder: 'create-update-facility.statePlaceholder',
      errorKey: 'create-update-facility.stateError',
      controlName: 'state',
      icon: 'pi-map-marker',
      type: 'text',
      label: 'create-update-facility.state',
    },
    {
      placeholder: 'create-update-facility.countryPlaceholder',
      errorKey: 'create-update-facility.countryError',
      controlName: 'country',
      icon: 'pi-map-marker',
      type: 'text',
      label: 'create-update-facility.country',
    },
    {
      placeholder: 'create-update-facility.postalCodePlaceholder',
      errorKey: 'create-update-facility.postalCodeError',
      controlName: 'postalCode',
      icon: 'pi-map-marker',
      type: 'text',
      label: 'create-update-facility.postalCode',
    },
  ];
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
      adminInfo: this.fb.group(
        {
          email: ['', [Validators.required, Validators.email]],
          password: ['', Validators.required],
          confirmPassword: ['', [Validators.required]],

          firstName: ['', Validators.required],
          lastName: ['', Validators.required],
          phone: ['', Validators.required],
          imageUrl: [''],
        },
        { validator: this.checkPasswords }
      ),
    });
    this.adminInfoGroup = this.facilityForm.get('adminInfo') as FormGroup;
    this.addressGroup = this.facilityForm.get('address') as FormGroup;

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
      this.adminInfo.removeControl('confirmPassword');
      console.log(this.facilityForm);

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
      // setTimeout(() => {
      //   this.router.navigate(['/facilities']);
      // }, 1500);
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
  // get addressFormGroup(): FormGroup {
  //   return this.facilityForm.get('address') as FormGroup;
  // }
  get adminInfo(): FormGroup {
    return this.facilityForm.get('adminInfo') as FormGroup;
  }
  hasMismatchError(): boolean {
    return this.facilityForm.get('password')?.hasError('mismatch') ?? false;
  }
  checkPasswords(g: AbstractControl) {
    const password = g.get('password')?.value;
    const confirmPassword = g.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }
}
