import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { InputComponent } from '../../../../../shared/components/input/input.component';
import { LocalizationService } from '../../../../../core/services/localization/localization.service';
import { ShiftType } from '../../../../../shared/enums/shift-type';
import { ContractType } from '../../../../../shared/enums/contract-type';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-ad-offer',
  standalone: true,
  imports: [
    SelectModule,
    CommonModule,
    InputNumberModule,
    TextareaModule,
    ButtonModule,
    ReactiveFormsModule,
    InputTextModule,
    TranslatePipe,
    TranslatePipe,
    DatePickerModule,
    InputComponent,
  ],
  templateUrl: './edit-ad-offer.component.html',
  styleUrl: './edit-ad-offer.component.scss',
})
export class EditAdOfferComponent implements OnInit {

  private localizationService = inject(LocalizationService)
  private fb = inject(FormBuilder)
  private route = inject(ActivatedRoute)
  private router = inject(Router)

  shiftType = this.localizationService.createDropdown(ShiftType)
  contractTypes = this.localizationService.createDropdown(ContractType)


  
  editAdOfferAdForm!: FormGroup
  date = new Date();

  constructor(){
    this.editAdOfferAdForm = this.fb.group({

    })
  }
  ngOnInit(): void {

    this.route.paramMap.subscribe((params)=> {
      const adId = params.get('adId')
      if(adId) {
        
      }

    })
  }
  
}
