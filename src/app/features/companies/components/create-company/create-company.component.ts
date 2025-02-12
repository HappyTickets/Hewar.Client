import { Component, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CompaniesService } from '../../services/companies.service';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { MessageModule } from 'primeng/message';
import { ImageUploaderComponent } from '../../../../shared/components/image-uploader/image-uploader.component';
import { MessageService } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { FileUpload } from 'primeng/fileupload';
import { FloatLabel, FloatLabelModule } from 'primeng/floatlabel';
import { IconFieldModule } from 'primeng/iconfield';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputIconModule } from 'primeng/inputicon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressBar } from 'primeng/progressbar';
import { SelectModule } from 'primeng/select';
import { StepperModule } from 'primeng/stepper';
import { ToastModule } from 'primeng/toast';
import { LocalizationService } from '../../../../core/services/localization/localization.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-company',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule, TranslateModule, InputComponent, MessageModule, ImageUploaderComponent,
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

  templateUrl: './create-company.component.html',
  styleUrl: './create-company.component.scss'
})
export class CreateCompanyComponent {
  createCompForm!:FormGroup
  adminInfoGroup!:FormGroup
  addressGroup!:FormGroup

  @ViewChild(ImageUploaderComponent) imageUploader!: ImageUploaderComponent;
  selectedImage: { base64: string; imageUrl: string } | null = null;
  fileUploadError = '';
  files: File[] = [];
  uploadedFiles: File[] = [];
  imageName = '';
  imagePreview: string | ArrayBuffer | null = null;

  companyDataInputs = [
      {
        placeholder: "companies.create-update-company.contactEmailPlaceholder",
        errorKey: "companies.create-update-company.contactEmailError",
        controlName: "contactEmail",
        icon: "pi-envelope",
        type: "email",
        label: "companies.create-update-company.contactEmail"
      },
      {
        placeholder:"companies.create-update-company.phoneNumberPlaceholder",
        errorKey:"companies.create-update-company.phoneNumberError",
        controlName:"phoneNumber",
        icon:"pi-phone",
        type:"text",
        label:"companies.create-update-company.phoneNumber",
      },
      {
        placeholder:"companies.create-update-company.registrationNumberPlaceholder",
        errorKey:"companies.create-update-company.registrationNumberError",
        controlName:"registrationNumber",
        icon:"pi-pen-to-square",
        type:"text",
        label:"companies.create-update-company.registrationNumber",
      },
      {
        placeholder:"companies.create-update-company.taxIdPlaceholder",
        errorKey:"companies.create-update-company.taxIdError",
        controlName:"taxId",
        icon:"pi-pen-to-square",
        type:"text",
        label:"companies.create-update-company.taxId",
      },
      {
        placeholder: "companies.create-update-company.namePlaceholder",
        errorKey: "companies.create-update-company.nameError",
        controlName: "name",
        icon: "pi-user",
        type: "text",
        label: "companies.create-update-company.name",
      },
  ]
  adminDataInputs = [
    {
      placeholder: "companies.create-update-company.emailPlaceholder",
      errorKey: "companies.create-update-company.emailError",
      controlName: "email",
      icon: "pi-envelope",
      type: "email",
      label: "companies.create-update-company.email"
    },
    {
      placeholder: "companies.create-update-company.passwordPlaceholder",
      errorKey: "companies.create-update-company.passwordError",
      controlName: "password",
      icon: "pi-lock",
      type: "password",
      label: "companies.create-update-company.password"
    },
    {
      placeholder: "companies.create-update-company.confirmPasswordPlaceholder",
      errorKey: "companies.create-update-company.confirmPasswordError",
      controlName: "confirmPassword",
      icon: "pi-lock",
      type: "password",
      label: "companies.create-update-company.confirmPassword"
    },
    {
      placeholder: "companies.create-update-company.firstNamePlaceholder",
      errorKey: "companies.create-update-company.firstNameError",
      controlName: "firstName",
      icon: "pi-user",
      type: "text",
      label: "companies.create-update-company.firstName"
    },
    {
      placeholder: "companies.create-update-company.lastNamePlaceholder",
      errorKey: "companies.create-update-company.lastNameError",
      controlName: "lastName",
      icon: "pi-user",
      type: "text",
      label: "companies.create-update-company.lastName"
    },
    {
      placeholder: "companies.create-update-company.phonePlaceholder",
      errorKey: "companies.create-update-company.phoneError",
      controlName: "phone",
      icon: "pi-phone",
      type: "text",
      label: "companies.create-update-company.phone"
    },
  ]
  addressDataInputs = [
    {
      placeholder: "companies.create-update-company.streetPlaceholder",
      errorKey: "companies.create-update-company.streetError",
      controlName: "street",
      icon: "pi-map-marker",
      type: "text",
      label: "companies.create-update-company.street"
    },
    {
      placeholder: "companies.create-update-company.cityPlaceholder",
      errorKey: "companies.create-update-company.cityError",
      controlName: "city",
      icon: "pi-map-marker",
      type: "text",
      label: "companies.create-update-company.city"
    },
    {
      placeholder: "companies.create-update-company.statePlaceholder",
      errorKey: "companies.create-update-company.stateError",
      controlName: "state",
      icon: "pi-map-marker",
      type: "text",
      label: "companies.create-update-company.state"
    },
    {
      placeholder: "companies.create-update-company.countryPlaceholder",
      errorKey: "companies.create-update-company.countryError",
      controlName: "country",
      icon: "pi-map-marker",
      type: "text",
      label: "companies.create-update-company.country"
    },
    {
      placeholder: "companies.create-update-company.postalCodePlaceholder",
      errorKey: "companies.create-update-company.postalCodeError",
      controlName: "postalCode",
      icon: "pi-map-marker",
      type: "text",
      label: "companies.create-update-company.postalCode"
    },
  ]
  constructor(private fb:FormBuilder, private _companiesService:CompaniesService, private router: Router,
      private messageService: MessageService,
      private localizationService: LocalizationService){
    this.createCompForm = this.fb.group({
      contactEmail: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required]],
      registrationNumber: ['', [Validators.required]],
      taxId: ['', [Validators.required]],
      name: ['', [Validators.required]],
      adminInfo: this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
        confirmPassword: [''],
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        phone: ['', [Validators.required]],
        imageUrl: [''],
      }, { validator: this.checkPasswords }),
      address: this.fb.group({
        street: ['', [Validators.required]],
        city: ['', [Validators.required]],
        state: ['', [Validators.required]],
        country: ['', [Validators.required]],
        postalCode: ['', [Validators.required]]
      })
    });
    this.adminInfoGroup = this.createCompForm.get('adminInfo') as FormGroup
    this.addressGroup = this.createCompForm.get('address') as FormGroup
  }
  onImageSelected(imageData: { base64: string; imageUrl: string }) {
    this.selectedImage = imageData;
    this.createCompForm.patchValue({ imageUrl: imageData.imageUrl });
  }
  onSubmit(): void {
      this.imageUploader.uploadFiles().subscribe(
        (imageNames) => {
          console.log('Uploaded images:', imageNames);
          this.createCompForm.get('adminInfo.imageUrl')!.setValue(imageNames); // Store image names in form

          // Now submit the form
          this._companiesService.createCompany(this.createCompForm.value).subscribe(
              (response) => {
                console.log('Facility created successfully:', response);
              },
              (error) => {
                console.error('Facility creation failed:', error);
                console.log('Uploaded images:', imageNames);
              }
            );
        },
        (error) => {
          console.error('Image upload failed:', error);
          this.createCompForm.get('adminInfo.imageUrl')!.setValue('imageNames');
          console.log('Submitting form:', this.createCompForm.value);
        }
      );
      console.log('Facility Data:', this.createCompForm.value);
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Facility Created',
      });
      setTimeout(() => {
        this.router.navigate(['/companies']);
      }, 1500);
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

  checkPasswords(g: AbstractControl) {
    const password = g.get('password')?.value;
    const confirmPassword = g.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }
}
