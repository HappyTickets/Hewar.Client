import { Component, inject, Input, OnInit } from '@angular/core';
import { ContractService } from '../../services/contract.service';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { LocalizationService } from '../../../../core/services/localization/localization.service';
import { TranslatePipe } from '@ngx-translate/core';
import { PermissionService } from '../../../auth/services/permission.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contract-signature',
  standalone: true,
  imports: [CommonModule, ButtonModule, FormsModule, TranslatePipe],
  templateUrl: './contract-signature.component.html',
  styleUrl: './contract-signature.component.scss'
})
export class ContractSignatureComponent implements OnInit {
  private localizationService = inject(LocalizationService);
  private toastrService = inject(ToastrService);
  private permissionService = inject(PermissionService);
  private contractService = inject(ContractService);
  @Input() contractId: number | null = null;
  @Input() facilitySignature: string | null = '';
  @Input() companySignature: string | null = '';
  language: 'ar' | 'en' = 'ar';

  editingFacility = false;
  editingCompany = false;
  tempFacilitySignature = '';
  tempCompanySignature = '';

  ngOnInit(): void {
    this.language = this.localizationService.getLanguage();
  }

  enableEditing(type: 'facility' | 'company') {
    if (type === 'facility') {
      if (this.permissionService.hasRole("Facility")) {
        this.tempFacilitySignature = this.facilitySignature || '';
        this.editingFacility = true;
      } else {
        this.toastrService.error("You Don't Have Permission");
      }
    } else {
      if (this.permissionService.hasRole("Company")) {
        this.tempCompanySignature = this.companySignature || '';
        this.editingCompany = true;
      } else {
        this.toastrService.error("You Don't Have Permission");
      }
    }
  }

  saveSignature(type: 'facility' | 'company') {
    const signatureValue = type === 'facility' ? this.tempFacilitySignature : this.tempCompanySignature;

    if (this.contractId) {
      this.contractService.signContract(this.contractId, signatureValue).subscribe(() => {
        if (type === 'facility') {
          this.facilitySignature = this.tempFacilitySignature;
          this.editingFacility = false;
        } else {
          this.companySignature = this.tempCompanySignature;
          this.editingCompany = false;
        }
      });
    }
  }

  cancelEditing(type: 'facility' | 'company') {
    if (type === 'facility') {
      this.editingFacility = false;
    } else {
      this.editingCompany = false;
    }
  }
}
