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
import { UploadImage2Component } from '../../../../shared/upload-image-2/upload-image-2.component';
import { ImageUploadService } from '../../../../shared/services/upload2/image-upload.service';
// import { passwordMatchValidator } from '../../../../shared/validators/checkPassword.validator';

@Component({
  selector: 'app-create-company',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule, TranslateModule, InputComponent, MessageModule,
    UploadImage2Component,
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
  uploadedFileImage: File | null = null;
  uploadedFileLogo: File | null = null;
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
  constructor(private fb:FormBuilder,
    private _companiesService:CompaniesService,
    private router: Router,
    private imageUploadService: ImageUploadService,
    private messageService: MessageService,
    private localizationService: LocalizationService){
      this.createCompForm = this.fb.group({
      contactEmail: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required]],
      registrationNumber: ['', [Validators.required]],
      taxId: ['', [Validators.required]],
      logo: ['', [Validators.required]],
      name: ['', [Validators.required]],
      adminInfo: this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
        confirmPassword: [''],
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        phone: ['', [Validators.required, Validators.pattern('^[0-9]{8,15}$')]],
        imageUrl: [''],
      }
    ),
        address: this.fb.group({
        street: ['', [Validators.required]],
        city: ['', [Validators.required]],
        state: ['', [Validators.required]],
        country: ['', [Validators.required]],
        postalCode: ['', [Validators.required, Validators.minLength(5)]]
      })
    });
    this.adminInfoGroup = this.createCompForm.get('adminInfo') as FormGroup
    this.addressGroup = this.createCompForm.get('address') as FormGroup
  }

  onFileSelectlogo(file: File | null) {
    this.uploadedFileLogo = file;
    console.log('Selefile:', file);
  }
  onFileSelectedImage(file: File | null) {
    this.uploadedFileImage = file;
    console.log('Selected file:', file);
  }
  get adminInfo(): FormGroup {
    return this.createCompForm.get('adminInfo') as FormGroup;
  }
  onSubmit(): void {
    console.log(this.createCompForm.value)
    if (this.createCompForm.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please fill in all required fields correctly.',
      });
      return;
    }
    this.adminInfo.removeControl('confirmPassword');
    const imageAdmin =
      'Companies/AminImage/' +
      this.createCompForm.get('name')?.value +
      Date.now().toString() +
      this.uploadedFileImage?.name;
      this.adminInfo.get('ImageUrl')!.setValue('imageAdmin');

    const logo =
      'Companies/Logos' +
      this.createCompForm.get('name')?.value +
      this.createCompForm.get('adminInfo.firstName')?.value +
      Date.now().toString();
      this.createCompForm.get('adminInfo.lastName');
      this.createCompForm.get('logo')!.setValue('logo');

      this._companiesService.createCompany(this.createCompForm.value).subscribe({
      next: (res) => {
        console.log('Company created successfully:', res);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Company Created',
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
            imageAdmin + this.uploadedFileImage?.name,
            this.uploadedFileImage!
          )
          .subscribe((data) => {
            console.log('Image uploaded successfully:', data);
          });
        console.log(this.createCompForm.value);
      },
      error: (error) => {
        console.error('Error creating Company:', error);

        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to create Company',
        });
      },
    });
    console.log(this.createCompForm.hasError);
  }

  cancel(): void {
    this.router.navigate(['/companies']);
  }
  // handleFileSizeError(errorMessage: string): void {
  //   this.fileUploadError = errorMessage; // Set error message
  // }
  // handelimagenam(imageName: string): void {
  //   this.imageName = imageName; // Set error message
  // }
    // onImageSelected(imageData: { base64: string; imageUrl: string }) {
  //   this.selectedImage = imageData;
  //   this.createCompForm.patchValue({ imageUrl: imageData.imageUrl });
  // }

  checkPasswords(g: AbstractControl) {
    const password = g.get('password')?.value;
    const confirmPassword = g.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }
}
