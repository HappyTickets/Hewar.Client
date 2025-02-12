import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CompaniesService } from '../../services/companies.service';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ICompany } from '../../models/ICompany';

@Component({
  selector: 'app-update-company',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule, TranslateModule, InputComponent ],
  templateUrl: './update-company.component.html',
  styleUrl: './update-company.component.scss'
})
export class UpdateCompanyComponent implements OnInit {
  updateCompForm!:FormGroup
  addressGroup!:FormGroup
  currentCompanyID :string | null = ''
  currentCompany:ICompany | undefined
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




  private readonly toastr = inject(ToastrService)
  constructor(private fb:FormBuilder, private _companiesService:CompaniesService, private _route: ActivatedRoute){
    this.createUpdateForm()
  }
  ngOnInit(): void {
    this.currentCompanyID = this._route.snapshot.paramMap.get('id');
    this._companiesService.getCompanyById(this.currentCompanyID!).subscribe({
      next: (res) => {
        if (res.data) {
          this.currentCompany = res.data;
        }
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
    this.addressGroup = this.updateCompForm.get('address') as FormGroup
  }
  onSubmit(){
    this._companiesService.updateCompany(this.updateCompForm.value).subscribe({
      next: () => {
        this.toastr.success("The company is added successfully", 'Successfully')
      },
      error: (err) =>{
        this.toastr.error(err.error.message, 'Error')
      }
    })
  }
}

