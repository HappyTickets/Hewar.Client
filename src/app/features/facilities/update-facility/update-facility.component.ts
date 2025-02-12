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
  @ViewChild(ImageUploaderComponent) imageUploader!: ImageUploaderComponent;
  imageName: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private facilityService: FacilitiesService,
    private messageService: MessageService,
    private localizationService: LocalizationService
  ) {
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
      logo: [''],

      address: this.fb.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        country: ['', Validators.required],
        postalCode: ['', Validators.required],
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

  updateFacility() {
    if (this.facilityForm.valid) {
      const updatedFacility = {
        ...this.facilityForm.value,
        id: this.facilityId,
      };

      this.facilityService
        .updateFacility(updatedFacility)
        .subscribe((response) => {
          console.log('Facility updated successfully:', response);
          this.router.navigate(['/facilities']); // Redirect to facility list after updating
        });
    }
  }
  onSubmit(): void {
    console.log('Submitting form:', this.facilityForm.value);
    if (true) {
      this.imageUploader.uploadFiles().subscribe(
        (imageNames) => {
          console.log('Uploaded images:', imageNames);
          this.facilityForm.get('logo')!.setValue(imageNames); // Store image names in form

          // Now submit the form
          this.facilityService
            .updateFacility(this.facilityForm.value)
            .subscribe(
              (response) => {
                console.log('Facility created successfully:', response);
              },
              (error) => {
                console.error('Facility creation failed:', error);
              }
            );
        },
        (error) => {
          console.error('Image upload failed:', error);
          this.facilityForm.get('logo')!.setValue('imageNames');
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
  handelImageName(imageName: string) {
    this.imageName = imageName;
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
}
