import { TableModule } from 'primeng/table';
import { Component, inject, OnInit, Renderer2 } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IContractTemplate } from '../../models/icontract-template';
import { ContractService } from '../../services/contract.service';
import { IContractKey } from '../../models/icontract-key';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-contract-preview',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    TranslatePipe,
    TableModule,
  ],
  templateUrl: './contract-preview.component.html',
  styleUrls: ['./contract-preview.component.scss'],
})
export class ContractPreviewComponent implements OnInit, OnDestroy {
  private localizationService = inject(LocalizationService);
  private contractService = inject(ContractService);
  private languageSubscription: Subscription;
  private route = inject(ActivatedRoute);
  private renderer = inject(Renderer2);
  private placeholderInput: HTMLInputElement | null = null;
  private cancelButton: HTMLButtonElement | null = null;
  private saveButton: HTMLButtonElement | null = null;
  editingValue: string | null = null;
  editingKey: string | null = null;
  contract: IContractTemplate = {} as IContractTemplate;
  language: 'ar' | 'en' = 'ar';
  constructor() {
    this.language = this.localizationService.getLanguage();
    this.languageSubscription = this.localizationService.language$.subscribe(
      (lang) => {
        this.language = lang;
        if (this.contract.contractId) this.replacePlaceholders();
      }
    );
  }
  ngOnDestroy() {
    this.languageSubscription?.unsubscribe();
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const offerId = +(params.get('id') ?? -1);
      if (offerId > -1) {
        this.contractService.GetByOfferId(offerId).subscribe((res) => {
          if (res.data) {
            this.contract = res.data;
            this.replacePlaceholders();
          }
        });
      }
    });
    this.loadScheduleEntries();
    this.loadCustomClauses();
  }
  private loadScheduleEntries(): void {
    this.scheduleEntries.clear();
    this.scheduleEntriesData.forEach((entry) => {
      this.scheduleEntries.push(this.createScheduleEntry(entry));
    });
  }
  private loadCustomClauses(): void {
    this.customClauses.clear();
    this.customClausesData.forEach((clause) => {
      this.customClauses.push(this.createCustomClause(clause));
    });
  }
  createCustomClause(clause?: IClause): FormGroup {
    return this.fb.group({
      ar: [clause?.htmlContentAr || ''],
      en: [clause?.htmlContentEn || ''],
    });
  }
  createScheduleEntry(entry?: IScheduleEntry): FormGroup {
    return this.fb.group({
      locationAr: [entry?.locationAr || ''],
      locationEn: [entry?.locationEn || ''],
      guardsRequired: [entry?.guardsRequired || null],
      shiftTimeAr: [entry?.shiftTimeAr || ''],
      shiftTimeEn: [entry?.shiftTimeEn || ''],
      notesAr: [entry?.notesAr || ''],
      notesEn: [entry?.notesEn || ''],
    });
  }
  addScheduleEntry(): void {
    this.scheduleEntries.push(this.createScheduleEntry());
  }
  removeScheduleEntry(index: number): void {
    this.scheduleEntries.removeAt(index);
  }
  addCustomClause(): void {
    this.customClauses.push(this.createCustomClause());
  }
  removeCustomClause(index: number): void {
    this.customClauses.removeAt(index);
  }
  saveScheduleEntries(): void {
    this.scheduleEntriesData = this.scheduleForm.value.scheduleEntries;
    this.isEditing = false;
    this.scheduleEntriesService
      .Create(this.scheduleForm.value.scheduleEntries, this.contractId || 0)
      .subscribe();
  }
  saveCustomClauses(): void {
    this.customClausesData = this.customClausesForm.value.customClauses;
    this.isEditingClauses = false;
    this.clausesService
      .CreateCustomClauses(
        this.customClausesForm.value.customClauses,
        this.contractId || 0
      )
      .subscribe();
  }
  toggleEdit(): void {
    this.isEditing = !this.isEditing;
    if (this.isEditing) {
      this.loadScheduleEntries();
    }
  }
  toggleEditClauses(): void {
    this.isEditingClauses = !this.isEditingClauses;
    if (this.isEditingClauses) {
      this.loadCustomClauses();
    }
  }
  private replacePlaceholders(): void {
    const keys = this.contract.contractKeys.reduce((acc, key) => {
      acc[key.keyName] = key;
      return acc;
    }, {} as Record<string, IContractKey>);
    if (this.language === 'ar') {
      this.contract.staticContractTemplate.preambleAr = this.replaceKeys(
        this.contract.staticContractTemplate.preambleAr,
        keys
      );
      this.contract.staticContractTemplate.closingRemarkAr = this.replaceKeys(
        this.contract.staticContractTemplate.closingRemarkAr,
        keys
      );
      this.contract.staticClauses.forEach((clause) => {
        clause.contentAr = this.replaceKeys(clause.contentAr, keys);
      });
    } else {
      this.contract.staticContractTemplate.preambleEn = this.replaceKeys(
        this.contract.staticContractTemplate.preambleEn,
        keys
      );
      this.contract.staticContractTemplate.closingRemarkEn = this.replaceKeys(
        this.contract.staticContractTemplate.closingRemarkEn,
        keys
      );
      this.contract.staticClauses.forEach((clause) => {
        clause.contentEn = this.replaceKeys(clause.contentEn, keys);
      });
    }
  }
  private replaceKeys(
    text: string,
    keys: Record<string, IContractKey>
  ): string {
    return text
      .replace(/{{(.*?)}}/g, (_, key) => {
        const trimmedKey = key.trim();
        const keyDetails = keys[trimmedKey];
        if (trimmedKey === 'OfferNumber') {
          return `<span>${this.contract.offerNumber}</span>`;
        } else if (trimmedKey === 'OfferDate') {
          return `<span>${new Date(this.contract.offerDate).toLocaleDateString(
            'en-GB'
          )}</span>`;
        }
        if (!keyDetails)
          return `<span class="placeholder-key">${trimmedKey}</span>`;
        return `<span class="placeholder-key ${keyDetails.id}">${keyDetails.value}</span>`;
      })
      .replace(/\n/g, '<br>');
  }
  onPlaceholderClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (target.classList.contains('placeholder-key')) {
      this.editingKey = target.classList[1];
      this.editingValue = target.innerText;
      this.showInputField(target);
    }
  }
  private showInputField(target: HTMLElement): void {
    if (this.placeholderInput) return;
    const parent = target.parentElement;
    if (!parent) return;
    // Create input field
    this.placeholderInput = this.renderer.createElement(
      'input'
    ) as HTMLInputElement;
    this.renderer.addClass(this.placeholderInput, 'placeholder-input');
    // Set input type and value based on dataType
    if (contractKey.dataType === 0) {
      this.placeholderInput.type = 'number';
      this.placeholderInput.value = this.editingValue || '';
    } else if (contractKey.dataType === 1) {
      this.placeholderInput.type = 'date';
      // Convert the date to the format expected by the input[type="date"]
      const dateValue = new Date(this.editingValue || '')
        .toISOString()
        .split('T')[0];
      this.placeholderInput.value = dateValue;
    } else {
      this.placeholderInput.type = 'text';
      this.placeholderInput.value = this.editingValue || '';
    }
    // Create save button
    this.saveButton = this.renderer.createElement(
      'button'
    ) as HTMLButtonElement;
    this.renderer.addClass(this.saveButton, 'save-button');
    this.saveButton.innerText = 'Save';
    // Create cancel button
    this.cancelButton = this.renderer.createElement(
      'button'
    ) as HTMLButtonElement;
    this.renderer.addClass(this.cancelButton, 'cancel-button');
    this.cancelButton.innerText = 'Cancel';
    // Replace target with input field
    this.renderer.insertBefore(parent, this.placeholderInput, target);
    this.renderer.insertBefore(parent, this.saveButton, target);
    this.renderer.insertBefore(parent, this.cancelButton, target);
    this.renderer.removeChild(parent, target);
    // Add event listeners
    this.renderer.listen(this.saveButton, 'click', () =>
      this.onSaveClick(parent)
    );
    this.renderer.listen(this.cancelButton, 'click', () =>
      this.onCancelClick(target, parent)
    );
  }
  private onSaveClick(parent: HTMLElement): void {
    const newValue = this.placeholderInput?.value;
    if (newValue !== null && this.editingKey) {
      this.updateContractKey(this.editingKey, newValue || '');
      // Create a new span element to replace the input field
      const newSpan = this.renderer.createElement('span');
      this.renderer.addClass(newSpan, 'placeholder-key');
      this.renderer.addClass(newSpan, this.editingKey); // Add the key class
      this.renderer.setProperty(newSpan, 'innerText', newValue || '');
      // Add the click event listener to the new span
      this.renderer.listen(newSpan, 'click', (event: MouseEvent) =>
        this.onPlaceholderClick(event)
      );
      // Restore the span in place of input
      this.renderer.insertBefore(parent, newSpan, this.placeholderInput);
      this.renderer.removeChild(parent, this.placeholderInput);
      this.renderer.removeChild(parent, this.saveButton);
      this.renderer.removeChild(parent, this.cancelButton);
      // Cleanup
      this.placeholderInput = null;
      this.saveButton = null;
      this.cancelButton = null;
      this.editingKey = null;
      this.editingValue = null;
    }
  }
  private onCancelClick(target: HTMLElement, parent: HTMLElement): void {
    // Restore the original span in place of input
    this.renderer.insertBefore(parent, target, this.placeholderInput);
    this.renderer.removeChild(parent, this.placeholderInput);
    this.renderer.removeChild(parent, this.saveButton);
    this.renderer.removeChild(parent, this.cancelButton);
    // Cleanup
    this.placeholderInput = null;
    this.saveButton = null;
    this.cancelButton = null;
  }
  private updateContractKey(key: string, newValue: string): void {
    const contractKey = this.contract.contractKeys.find((k) => k.id === +key);
    if (contractKey) {
      contractKey.value = newValue;
      this.contractService
        .UpdateContractByKeys(
          [{ newValue, contractKeyId: +key }],
          this.contractId || 0
        )
        .subscribe();
    }
  }
  getTotalDailyCost(
    services: IPriceOfferService[],
    otherServices: IPriceOfferOtherService[]
  ): number {
    let total = 0;
    total += services.reduce((acc, service) => {
      return acc + service.dailyCostPerUnit * service.quantity;
    }, 0);
    total += otherServices.reduce((acc, service) => {
      return acc + service.dailyCostPerUnit * service.quantity;
    }, 0);
    return total;
  }
  getTotalMonthlyCost(
    services: IPriceOfferService[],
    otherServices: IPriceOfferOtherService[]
  ): number {
    let total = 0;
    total += services.reduce((acc, service) => {
      return acc + service.monthlyCostPerUnit * service.quantity;
    }, 0);
    total += otherServices.reduce((acc, service) => {
      return acc + service.monthlyCostPerUnit * service.quantity;
    }, 0);
    return total;
  }

  tempFacilitySignature = this.contract.facilitySignature;
  tempCompanySignature = this.contract.companySignature;
  editingFacility = false;
  editingCompany = false;
  editing: boolean[] = [false, false];
  enableEditing(type: 'facility' | 'company') {
    if (type === 'facility') {
      this.editingFacility = true;
    } else {
      this.editingCompany = true;
    }
  }

  saveSignature(type: 'facility' | 'company') {
    if (type === 'facility') {
      this.contract.facilitySignature = this.tempFacilitySignature;
      this.editingFacility = false;
      this.sendSignatureToServer(
        'facilitySignature',
        this.tempFacilitySignature
      );
    } else {
      this.contract.companySignature = this.tempCompanySignature;
      this.editingCompany = false;
      this.sendSignatureToServer('companySignature', this.tempCompanySignature);
    }
  }

  sendSignatureToServer(key: string, signature: string | null) {
    this.contractService
      .signContract(this.contractId || 0, signature || '')
      .subscribe();
  }
}
