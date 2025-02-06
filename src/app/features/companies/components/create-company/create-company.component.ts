import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { CompaniesService } from '../../services/companies.service';
import { ToastrService } from 'ngx-toastr';
import { IResponse } from '../../../../core/models/IResponse';
import { ICreateCompany } from '../../models/ICreateCompany';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

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
    RouterLink
  ],
  templateUrl: './create-company.component.html',
  styleUrl: './create-company.component.scss'
})
export class CreateCompanyComponent {
  createCompForm!:FormGroup
  files: File[] = [];
  imageUrl = '';
  private readonly toastr = inject(ToastrService)
  constructor(private fb:FormBuilder, private _companiesService:CompaniesService){
    this.createCompForm = this.fb.group({
      name: [null, [Validators.required]],
      phone: [null, [Validators.required]],
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
      address: [null, [Validators.required]],
    });
  }
  onSelect(event: { addedFiles: File[] }) {
    this.files.push(...event.addedFiles);
    this.imageUrl = URL.createObjectURL(this.files[0]);
  }

  onRemove(event: File) {
    this.files.splice(this.files.indexOf(event), 1);
  }
  onSubmit(){
    const companyData = new FormData()
    Object.keys(this.createCompForm.controls).forEach((key) => {
      const value = this.createCompForm.get(key)?.value
      if(value){
        companyData.append(key, value)
      }
    });
    companyData.append('imageUrl', this.imageUrl)
    this._companiesService.createCompany(companyData).subscribe({
      next: (res:IResponse<ICreateCompany>) => {
        console.log(res)
        this.toastr.success("The company is added successfully", 'Successfully')
      },
      error: (err) =>{
        this.toastr.error(err.error.message, 'Error')
      }
    })
  }
}

