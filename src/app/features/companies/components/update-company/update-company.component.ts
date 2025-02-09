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
import { TranslateModule } from '@ngx-translate/core';
import { FloatLabelModule } from 'primeng/floatlabel';

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
    RouterLink,
    TranslateModule,
    FloatLabelModule,
    InputTextModule,
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
    this.currentCompanyID = this._route.snapshot.paramMap.get('id');
    this._companiesService.getCompanyById(this.currentCompanyID!).subscribe({
      next: (res) => {
        this.currentCompany = res.data;
        this.updateCompForm.patchValue({
          contactEmail: this.currentCompany?.contactEmail,
          phoneNumber: this.currentCompany?.phoneNumber,
          registrationNumber: this.currentCompany?.registrationNumber,
          taxId: this.currentCompany?.taxId,
          name: this.currentCompany?.name,
          address: {
            street: this.currentCompany?.address?.street,
            city: this.currentCompany?.address?.city,
            state: this.currentCompany?.address?.state,
            country: this.currentCompany?.address?.country,
            postalCode: this.currentCompany?.address?.postalCode,
          }
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
      contactEmail: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required]],
      registrationNumber: ['', [Validators.required]],
      taxId: ['', [Validators.required]],
      name: ['', [Validators.required]],
      address: this.fb.group({
        street: ['', [Validators.required]],
        city: ['', [Validators.required]],
        state: ['', [Validators.required]],
        country: ['', [Validators.required]],
        postalCode: ['', [Validators.required]]
      })
    });
  }
  onSubmit(){
    this._companiesService.updateCompany(this.updateCompForm.value).subscribe({
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

