import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { CompaniesService } from '../../services/companies.service';
import { ToastrService } from 'ngx-toastr';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
  selector: 'app-create-company',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    NgxDropzoneModule,
    RouterLink,
    TranslateModule,
    FloatLabelModule,
    InputTextModule,
  ],
  templateUrl: './create-company.component.html',
  styleUrl: './create-company.component.scss'
})
export class CreateCompanyComponent {
  createCompForm!:FormGroup
  companyData = new FormData();
  files: File[] = [];
  imageUrl = '';
  selectedFile: File | null = null;
  private readonly toastr = inject(ToastrService)
  constructor(private fb:FormBuilder, private _companiesService:CompaniesService){
    this.createCompForm = this.fb.group({
      contactEmail: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required]],
      registrationNumber: ['', [Validators.required]],
      taxId: ['', [Validators.required]],
      name: ['', [Validators.required]],
      adminInfo: this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        phone: ['', [Validators.required]],
      }),
      address: this.fb.group({
        street: ['', [Validators.required]],
        city: ['', [Validators.required]],
        state: ['', [Validators.required]],
        country: ['', [Validators.required]],
        postalCode: ['', [Validators.required]]
      })
    });
  }
  onSelect(event: { addedFiles: File[] }) {
    this.files.push(...event.addedFiles);
    this.imageUrl = URL.createObjectURL(this.files[0]);
    console.log(this.files[0])
    console.log(this.imageUrl)
  }
  onRemove(event: File) {
    this.files.splice(this.files.indexOf(event), 1);
  }
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0]; // Store the selected file
    }
  }
  onSubmit() {
    const companyData = new FormData()
    Object.keys(this.createCompForm.controls).forEach((key) => {
      const value = this.createCompForm.get(key)?.value
      if(value){
        companyData.append(key, value)
      }
      // if(typeof(value) == 'object'){
      //   Object.keys(this.createCompForm.controls).forEach((key) => {
      //     const value = this.createCompForm.get(key)?.value
      //     companyData.append(key, value)
      //     console.log(value)
      //   });
      // } else {
      //   companyData.append(key, value)
      // }

    });
    companyData.append('imageUrl', this.imageUrl)
    console.log(companyData)
    this._companiesService.createCompany(companyData).subscribe({
      next: (res)=> {
        console.log(res)
      },
      error: (err) => {
        console.log(err)
      },
    })
  }
}

// onSubmit() {
//   if (this.createCompForm.invalid) {
//     console.error('Form is invalid');
//     return;
//   }

//   const formData = new FormData();
//   formData.append('name', this.createCompForm.get('name')?.value);
//   formData.append('phone', this.createCompForm.get('phone')?.value);
//   formData.append('email', this.createCompForm.get('email')?.value);
//   formData.append('password', this.createCompForm.get('password')?.value);
//   formData.append('address', this.createCompForm.get('address')?.value);

//   if (this.selectedFile) {
//     formData.append('file', this.selectedFile);
//   }

//   this._companiesService.uploadFile(formData).subscribe({
//     next: (res) => console.log('Upload successful:', res),
//     error: (err) => console.error('Upload failed:', err),
//   });
// }
  // onSubmit(){
  //   if (!this.selectedFile) {
  //     console.error('No file selected');
  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append('file', this.selectedFile); // Append the file

  //   this._companiesService.uploadFile(formData).subscribe({
  //     next: (res) => console.log('Upload successful:', res),
  //     error: (err) => console.error('Upload failed:', err),
  //   });
  // }
  //   // this._companiesService.uploadFile(formData).subscribe({
  //   //   next: (res) => {
  //   //     console.log(res)
  //   //     // this.toastr.success("The company is added successfully", 'Successfully')
  //   //   },
  //   //   error: (err) =>{
  //   //     this.toastr.error(err.error.message, 'Error')
  //   //   }
  //   // })

  // //   const companyData = new FormData()
  // //   Object.keys(this.createCompForm.controls).forEach((key) => {
  // //     const value = this.createCompForm.get(key)?.value
  // //     if(value){
  // //       companyData.append(key, value)
  // //     }
  // //   });
  // //   companyData.append('imageUrl', this.imageUrl)
  // //   this._companiesService.createCompany(companyData).subscribe({
  // //     next: (res:IResponse<ICreateCompany>) => {
  // //       console.log(res)
  // //       this.toastr.success("The company is added successfully", 'Successfully')
  // //     },
  // //     error: (err) =>{
  // //       this.toastr.error(err.error.message, 'Error')
  // //     }
  // //   })
  // // }
// }


