import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FacilitiesService } from '../services/facilities.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
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
import { ImageUploaderComponent } from '../../../shared/components/image-uploader/image-uploader.component';
import { InputComponent } from '../../../shared/components/input/input.component';
import { MessageService } from 'primeng/api';
import { LocalizationService } from '../../../core/services/localization/localization.service';
import { UploadImage2Component } from '../../../shared/upload-image-2/upload-image-2.component';
import { ImageUploadService } from '../../../shared/services/upload2/image-upload.service';

@Component({
  selector: 'app-update-facility',
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
    UploadImage2Component,
  ],
  templateUrl: './update-facility.component.html',
  styleUrls: ['./update-facility.component.scss'],
  providers: [MessageService],
})
export class UpdateFacilityComponent implements OnInit {
  acilityId: string | null = null;
  facilityForm!: FormGroup;
  facilityId!: number;
  fileUploadError: string = '';
  preview: string = '';
  uploadedFileImage: File | null = null;
  @ViewChild(ImageUploaderComponent) imageUploader!: ImageUploaderComponent;
  imageName = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private facilityService: FacilitiesService,
    private messageService: MessageService,
    private localizationService: LocalizationService,
    private imageUploadService: ImageUploadService
  ) {
    this.facilityForm = this.fb.group({
      id: [0], // Ensure id is included
      type: ['', Validators.required],
      name: ['', Validators.required],
      commercialRegistration: ['', Validators.required],
      activityType: ['', Validators.required],
      responsibleName: ['', Validators.required],
      responsiblePhone: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{8,15}$')],
      ],
      logo: [''],
      address: this.fb.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        country: ['', Validators.required],
        postalCode: ['', [Validators.required, Validators.minLength(5)]], // Keep as string
      }),
    });
  }

  ngOnInit(): void {
    this.facilityId = +this.route.snapshot.paramMap.get('id')!;

    // Fetch facility details
    this.getFacilityById(this.facilityId);
    this.loadFacilityData();
  }
  loadFacilityData(): void {
    this.facilityService.getFacilityById(this.facilityId).subscribe((data) => {
      this.facilityForm.patchValue(data.data);

      console.log(data);

      // Set existing image preview
    });
  }
  handleFileSizeError(errorMessage: string): void {
    this.fileUploadError = errorMessage;
  }

  getFacilityById(id: number) {
    this.facilityService.getFacilityById(id).subscribe((facility) => {
      if (facility) {
        this.facilityForm.patchValue(facility);
      }
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
      console.log('🚨 Form is invalid! Errors:', this.facilityForm.errors);
      Object.keys(this.facilityForm.controls).forEach((key) => {
        const controlErrors = this.facilityForm.get(key)?.errors;
        if (controlErrors) {
          console.log(`❌ Field "${key}" errors:`, controlErrors);
        }
      });
      return; // Stop execution if form is invalid
    }

    console.log(
      '✅ Form is valid, proceeding with update:',
      this.facilityForm.value
    );

    // Prepare updated facility data
    let updatedFacility = {
      ...this.facilityForm.value,
      address: {
        ...this.facilityForm.value.address,
        postalCode: String(this.facilityForm.value.address.postalCode),
      },
    };

    console.log('Before modifying logo:', updatedFacility.logo);

    if (this.uploadedFileImage) {
      const imageFacility = `Facilities/AminImage/${
        this.facilityForm.get('name')?.value
      }_${Date.now()}_${this.uploadedFileImage.name}`;

      // ✅ First, update the logo in the form
      this.facilityForm.patchValue({ logo: imageFacility });

      // ✅ Now, also update the `updatedFacility` object
      updatedFacility.logo = imageFacility;

      console.log('🖼 New image detected, updating logo:', imageFacility);

      // ✅ Upload image first
      this.imageUploadService
        .uploadImageBinary(imageFacility, this.uploadedFileImage)
        .subscribe({
          next: (data) => {
            console.log('✅ Image uploaded successfully:', data);

            // ✅ After successful upload, send the update request
            this.sendFacilityUpdate(updatedFacility);
          },
          error: (err) => {
            console.error('🚨 Image upload failed:', err);
          },
        });
    } else {
      console.log('🖼 No new image uploaded, keeping existing logo.');
      this.sendFacilityUpdate(updatedFacility);
    }
  }

  sendFacilityUpdate(updatedFacility: any): void {
    console.log(
      '📤 Final update payload (before sending to API):',
      updatedFacility
    );

    this.facilityService.updateFacility(updatedFacility).subscribe({
      next: (res) => {
        console.log('✅ Facility updated successfully:', res);

        // Fetch updated facility to verify
        this.fetchUpdatedFacility();

        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Facility Updated',
        });
      },
      error: (err) => {
        console.error('🚨 Error updating facility:', err);
      },
    });
  }
  fetchUpdatedFacility(): void {
    this.facilityService.getFacilityById(this.facilityId).subscribe({
      next: (res) => {
        console.log('✅ Facility fetched successfully:', res);
        this.facilityForm.patchValue(res.data); // Ensure form updates with new values
      },
      error: (err) => {
        console.error('🚨 Error fetching facility:', err);
      },
    });
  }

  cancel(): void {
    this.router.navigate(['/facilities']);
  }
  get addressFormGroup(): FormGroup {
    return this.facilityForm.get('address') as FormGroup;
  }
  get adminInfo(): FormGroup {
    return this.facilityForm.get('adminInfo') as FormGroup;
  }
  onFileSelectedImage(file: File | null) {
    this.uploadedFileImage = file;
    console.log('Selected file:', file);
  }
}
