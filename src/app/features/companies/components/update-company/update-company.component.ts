import { Component, inject, OnInit } from '@angular/core';
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
import { ICompany } from '../../models/ICompany';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-update-company',
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
  templateUrl: './update-company.component.html',
  styleUrl: './update-company.component.scss'
})
export class UpdateCompanyComponent implements OnInit {

  updateCompForm!:FormGroup
  files: File[] = [];
  imageUrl = '';
  currentCompanyID :string | null = ''
  currentCompany:ICompany | undefined
  private readonly toastr = inject(ToastrService)
  constructor(private fb:FormBuilder, private _companiesService:CompaniesService, private _route: ActivatedRoute){
    this.createUpdateForm()
  }
  ngOnInit(): void {
    this.currentCompanyID = this._route.snapshot.paramMap.get('id'); // Get the ID from URL
    this._companiesService.getCompanyById(this.currentCompanyID!).subscribe({
      next: (res) => {
        this.currentCompany = res.data;
        this.updateCompForm.patchValue({
          name: this.currentCompany?.name,
          phone: this.currentCompany?.phone,
          email: this.currentCompany?.email,
          address: this.currentCompany?.address,
        });
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log(this.currentCompany);
      }
    });
  }
  createUpdateForm(){
    this.updateCompForm = this.fb.group({
      name: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: [null, [Validators.required]],
      address: ['', [Validators.required]],
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
    Object.keys(this.updateCompForm.controls).forEach((key) => {
      const value = this.updateCompForm.get(key)?.value
      if(value){
        companyData.append(key, value)
      }
    });
    companyData.append('imageUrl', this.imageUrl)
    this._companiesService.updateCompany(companyData).subscribe({
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

