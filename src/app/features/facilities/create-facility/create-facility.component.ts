import { Component, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ValidationErrors,
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
import { UploadImage2Component } from '../../../shared/upload-image-2/upload-image-2.component';
import { ImageUploadService } from '../../../shared/services/upload2/image-upload.service';
import { passwordMatchValidator } from '../../../shared/validators/checkPassword.validator';

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

    ToastModule,

    BadgeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DropdownModule,

    InputComponent,

    TranslateModule,
    IftaLabelModule,
    IconFieldModule,
    FloatLabelModule,
    InputIconModule,
    MessageModule,
    UploadImage2Component,
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

  totalSizePercent: number = 0;
  facilityForm!: FormGroup;
  addressGroup!: FormGroup;
  createCompForm!: FormGroup;
  adminInfoGroup!: FormGroup;
  uploadedFileImage: File | null = null;
  uploadedFileLogo: File | null = null;

  imagePreview: string | ArrayBuffer | null = null;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private messageService: MessageService,
    private localizationService: LocalizationService,
    private facilityService: FacilitiesService,
    private http: HttpClient,
    private imageUploadService: ImageUploadService
  ) {
    this.language = this.localizationService.getLanguage();
    this.languageSubscription = this.localizationService.language$.subscribe(
      (lang) => {
        {
          this.language = lang;
        }
      }
    );
    this.facilityForm = this.fb.group({
      type: ['', Validators.required],
      name: ['', Validators.required],
      commercialRegistration: ['', Validators.required],
      activityType: ['', Validators.required],
      responsibleName: ['', Validators.required],
      logo: [''],
      responsiblePhone: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{8,15}$')],
      ],
      address: this.fb.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        country: ['', Validators.required],
        postalCode: ['', [Validators.required, Validators.minLength(5)]],
      }),
      adminInfo: this.fb.group(
        {
          email: ['', [Validators.required, Validators.email]],
          password: [
            '',
            [
              Validators.required,
              Validators.minLength(8),
              Validators.pattern(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$%*&^#])[A-Za-z\d@$%*&^#]{8,}$/
              ),
            ],
          ],
          confirmPassword: ['', Validators.required],
          firstName: ['', Validators.required],
          lastName: ['', Validators.required],
          phone: ['', Validators.required],
          imageUrl: [''],
        },
        { validators: passwordMatchValidator() }
      ),
    });
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
      placeholder: 'create-update-facility.streetPlaceholder',
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

  onSubmit(): void {
    if (this.facilityForm.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please fill in all required fields correctly.',
      });
      return;
    }

    this.adminInfo.removeControl('confirmPassword');

    const imageFaciliy =
      'Facilities/AminImage/' +
      this.facilityForm.get('name')?.value +
      Date.now().toString() +
      this.uploadedFileImage?.name;
    const logo =
      'Facilities/Logos' +
      this.facilityForm.get('name')?.value +
      this.facilityForm.get('adminInfo.firstName')?.value +
      Date.now().toString();
    this.facilityForm.get('adminInfo.lastName');
    this.facilityForm.get('adminInfo.imageUrl')!.setValue(imageFaciliy);
    this.facilityForm.get('logo')!.setValue(logo);
    this.facilityService.createFacility(this.facilityForm.value).subscribe({
      next: (res) => {
        console.log('Facility created successfully:', res);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Facility Created',
        });
        this.imageUploadService
          .uploadImageBinary(
            logo + this.uploadedFileLogo?.name,
            this.uploadedFileLogo!
          )
          .subscribe((data) => {
            console.log('Logo uploaded successfully:', data);
          });
        this.imageUploadService
          .uploadImageBinary(
            imageFaciliy + this.uploadedFileImage?.name,
            this.uploadedFileImage!
          )
          .subscribe((data) => {
            console.log('Image uploaded successfully:', data);
          });
        console.log(this.facilityForm.value);
      },
      error: (error) => {
        console.error('Error creating facility:', error);

        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to create facility',
        });
      },
    });
    console.log(this.facilityForm.hasError);
  }

  cancel(): void {
    this.router.navigate(['/facilities']);
  }

  get adminInfo(): FormGroup {
    return this.facilityForm.get('adminInfo') as FormGroup;
  }

  postalCodeValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value as string;
    if (!value) {
      return { required: true }; // Required validation
    }
    return /^\d{5}$/.test(value) ? null : { postalCodeInvalid: true };
  }

  getErrorKeyForAddress(controlName: string): string {
    const control = this.facilityForm.get(`address.${controlName}`);

    if (!control || !control.errors) return '';

    if (controlName === 'postalCode') {
      if (control.errors['required']) {
        return 'create-update-facility.postalCodeError';
      }
      if (control.errors['minlength']) {
        return 'create-update-facility.postalCodeInvalidError';
      }
    }

    if (controlName === 'country') {
      if (control.errors['required']) {
        return 'create-update-facility.countryError';
      }
    }
    if (controlName === 'state') {
      if (control.errors['required']) {
        return 'create-update-facility.stateError';
      }
    }
    if (controlName === 'city') {
      if (control.errors['required']) {
        return 'create-update-facility.cityError';
      }
    }
    if (controlName === 'street') {
      if (control.errors['required']) {
        return 'create-update-facility.streetError';
      }
    }

    return '';
  }
  getErrorKeyForFacility(controlName: string): string {
    const control = this.facilityForm.get(`${controlName}`);
    if (!control || !control.errors) return '';
    if (controlName === 'name') {
      if (control.errors['required']) {
        return 'create-update-facility.nameError';
      }
      if (control.errors['minlength']) {
        return 'create-update-facility.nameInvalidError';
      }
    }
    if (controlName === 'type') {
      if (control.errors['required']) {
        return 'create-update-facility.typeError';
      }
    }
    if (controlName === 'commercialRegistration') {
      if (control.errors['required']) {
        return 'create-update-facility.registrationNumberError';
      }
      if (control.errors['minlength']) {
        return 'create-update-facility.commercialRegistrationInvalidError';
      }
    }
    if (controlName === 'activityType') {
      if (control.errors['required']) {
        return 'create-update-facility.activityTypeError';
      }
    }
    if (controlName === 'responsibleName') {
      if (control.errors['required']) {
        return 'create-update-facility.responsibleNameErr';
      }
      if (control.errors['minlength']) {
        return 'create-update-facility.responsibleNameInvalidError';
      }
    }
    if (controlName === 'responsiblePhone') {
      if (control.errors['required']) {
        return 'create-update-facility.responsiblePhoneError';
      }
      if (control.errors['minlength']) {
        return 'create-update-facility.responsiblePhoneInvalidError';
      }
    }

    return '';
  }
  getErrorKeyForAdmin(controlName: string): string {
    const control = this.facilityForm.get(`adminInfo.${controlName}`);

    if (!control || !control.errors) return '';

    if (controlName === 'firstName') {
      if (control.errors['required']) {
        return 'create-update-facility.firstNameError';
      }
    }
    if (controlName === 'lastName') {
      if (control.errors['required']) {
        return 'create-update-facility.lastNameError';
      }
    }
    if (controlName === 'email') {
      if (control.errors['required']) {
        return 'create-update-facility.emailError';
      }
      if (control.errors['email']) {
        return 'create-update-facility.emailInvalidError';
      }
    }
    if (controlName === 'password') {
      if (control.errors['required']) {
        return 'create-update-facility.passwordError';
      }
      if (control.errors['minlength']) {
        return 'create-update-facility.short';
      }

      if (control.errors['pattern']) {
        return 'create-update-facility.passwordInvalidError';
      }
      if (control.errors['passwordMismatch']) {
        return 'create-update-facility.confirmPasswordError-2';
      }
    }

    if (controlName === 'phone') {
      if (control.errors['required']) {
        return 'create-update-facility.phoneError';
      }
      if (control.errors['minlength']) {
        return 'create-update-facility.phoneInvalidError';
      }
    }

    return '';
  }
  onFileSelectlogo(file: File | null) {
    this.uploadedFileLogo = file;
    console.log('Selefile:', typeof file);
  }
  onFileSelectedImage(file: File | null) {
    this.uploadedFileImage = file;
    console.log('Selected file:', typeof file);
  }
}
