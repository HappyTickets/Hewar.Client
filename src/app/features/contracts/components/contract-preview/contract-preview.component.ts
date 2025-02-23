import { ContractDispayServiceComponent } from './../contract-dispay-service/contract-dispay-service.component';
import { LocalizationService } from '../../../../core/services/localization/localization.service';
import { ContractSignatureComponent } from '../contract-signature/contract-signature.component';
import { ScheduleEntriesComponent } from '../schedule-entries/schedule-entries.component';
import { CustomClausesComponent } from '../custom-clauses/custom-clauses.component';
import { Component, inject, OnInit, Renderer2, OnDestroy } from '@angular/core';
import { IContractTemplate } from '../../models/icontract-template';
import { ContractService } from '../../services/contract.service';
import { IContractKey } from '../../models/icontract-key';
import { TranslatePipe } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-contract-preview',
  standalone: true,
  imports: [CommonModule, ScheduleEntriesComponent, ContractDispayServiceComponent, CustomClausesComponent, ContractSignatureComponent, TranslatePipe],
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
    this.languageSubscription = this.localizationService.language$.subscribe(lang => {this.language = lang;if (this.contract.contractId) this.replacePlaceholders()}
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
            // this.contract.staticContractTemplate.preambleAr = "أبرم هذا العقد بين كل من:\n الطرف الأول: شركة {{CompanyNameAr}} ومركزها الرئيسي في مدينة {{CompanyMainOfficeCityAr}} مسجــلة بالسجل التجاري رقم ({{CompanyCommercialRegistration}}) ترخيص الأمن العام رقم {{CompanyPublicSecurityLicense}} هاتف {{CompanyTelephone}} جوال {{CompanyMobile}} العنوان الوطني {{CompanyAddressCityAr}} الرمز البريدي ({{CompanyAddressPostalCode}}) وحدة رقم ({{CompanyAddressUnitNumber}}) مبنى رقم ({{CompanyAddressBuildingNumber}}) رقم التسجيل في سبل، واصل ({{CompanyRegistrationInSabl}}) بريد إلكتروني {{CompanyEmail}} ويمثلها في التوقيع على هذا العقد  / {{CompanyRepresentativeNameAr}} بصفته {{CompanyRepresentativeTitleAr}}.\n\n الطرف الثاني: السادة/ {{FacilityNameAr}} العقد الأساسي الموقع بتاريخ {{ContractSignDate}}\n ومركزها الرئيسي في مدينة {{FacilityMainOfficeCityAr}} : مسجــلة بالسجل التجاري مسجل بمدينة {{FacilityCommercialRegistrationCityAr}}  جوال ({{FacilityMobile}}) العنوان الوطني ({{FacilityAddressCityAr}}) الرمز البريدي ({{FacilityAddressPostalCode}}) وحدة رقم ({{FacilityAddressUnitNumber}}) مبنى رقم ({{FacilityAddressBuildingNumber}}) بريد إلكتروني {{FacilityEmail}} ويمثلها في التوقيع على هذا العقد\n الأستاذ / {{FacilityRepresentativeNameAr}} بصفته : {{FacilityRepresentativeTitleAr}}. \n\nحيث أن الطرف الثاني يرغب في تأمين خدمات الحراسة الأمنية المدنية لموقعه {{FacilityLocationToBeSecuredAr}} فتقدم الطرف الأول بعرضه رقـــــــم ({{OfferNumber}}) وتاريخ ({{OfferDate}}) المرفق به بيان الخدمات التي يقدمها الطرف الأول وأسلوبها وأسعارها وقد لقي العرض قبولاً لدى الطرف الثاني وعليه فقد اتفق الطرفان وتراضيا على البنود والشروط التالية:\n\n • عدم فسخ العقد من قبل الطرفين الا بعد أشعار شعبة الحراسات الأمنية بالميدانية بذالك. \n• الالتزام بعمل جدول موضح به عدد الحراسات وأوقات ساعات العمل \n• التقيد بالتعليمات فيما يخص نظام مكتب العمل والعمال من حيث عدد ساعات العمل بشهر رمضان المبارك.\n"
            this.replacePlaceholders();
          }
        });
      }
    });
  }
  private replacePlaceholders(): void {
    const keys = this.contract.contractKeys.reduce((acc, key) => {acc[key.keyName] = key;return acc;}, {} as Record<string, IContractKey>);
    if (this.language === 'ar') {
      this.contract.staticContractTemplate.preambleAr = this.replaceKeys(this.contract.staticContractTemplate.preambleAr,keys);
      this.contract.staticContractTemplate.closingRemarkAr = this.replaceKeys(this.contract.staticContractTemplate.closingRemarkAr,keys);
      this.contract.staticClauses.forEach((clause) => {clause.contentAr = this.replaceKeys(clause.contentAr, keys)});
    } else {
      this.contract.staticContractTemplate.preambleEn = this.replaceKeys(this.contract.staticContractTemplate.preambleEn,keys);
      this.contract.staticContractTemplate.closingRemarkEn = this.replaceKeys(this.contract.staticContractTemplate.closingRemarkEn,keys);
      this.contract.staticClauses.forEach((clause) => {clause.contentEn = this.replaceKeys(clause.contentEn, keys)});
    }
  }
  private replaceKeys( text: string, keys: Record<string, IContractKey>): string {
    return text.replace(/{{(.*?)}}/g, (_, key) => {
      const trimmedKey = key.trim();
      const keyDetails = keys[trimmedKey];
      if(trimmedKey === 'OfferNumber') {return `<span>${this.contract.offerNumber}</span>`;}
      if(trimmedKey === 'OfferDate') {return `<span>${new Date(this.contract.offerDate).toLocaleDateString('en-GB')}</span>`;}
      if (!keyDetails)return `<span class="placeholder-key">${trimmedKey}</span>`;
      if (keyDetails.value === '') return `<span class="placeholder-key ${keyDetails.id}">----------</span>`;;
      return `<span class="placeholder-key ${keyDetails.id}">${keyDetails.value}</span>`;
      }).replace(/\n/g, '<br>')
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
    // Find the contract key being edited
    const keyId = target.classList[1]; // The second class is the key ID
    const contractKey = this.contract.contractKeys.find((k) => k.id === +keyId);
    if (!contractKey) return;
    // Create input field based on dataType
    this.placeholderInput = this.renderer.createElement('input') as HTMLInputElement;
    this.renderer.addClass(this.placeholderInput, 'placeholder-input');
    // Set input type and value based on dataType
    if (contractKey.dataType === 0) {
      this.placeholderInput.type = 'number';
      this.placeholderInput.value = this.editingValue || '';
    } else if (contractKey.dataType === 1) {
      this.placeholderInput.type = 'date';
      // Convert the date to the format expected by the input[type="date"]
      const dateValue = new Date(this.editingValue || '').toISOString().split('T')[0];
      this.placeholderInput.value = dateValue;
    } else {
        this.placeholderInput.type = 'text';
        this.placeholderInput.value = this.editingValue || '';
    }
    // Create save button
    this.saveButton = this.renderer.createElement('button') as HTMLButtonElement;
    this.renderer.addClass(this.saveButton, 'save-button');
    this.saveButton.innerText = 'Save';
    // Create cancel button
    this.cancelButton = this.renderer.createElement('button') as HTMLButtonElement;
    this.renderer.addClass(this.cancelButton, 'cancel-button');
    this.cancelButton.innerText = 'Cancel';
    // Replace target with input field
    this.renderer.insertBefore(parent, this.placeholderInput, target);
    this.renderer.insertBefore(parent, this.saveButton, target);
    this.renderer.insertBefore(parent, this.cancelButton, target);
    this.renderer.removeChild(parent, target);
    // Add event listeners
    this.renderer.listen(this.saveButton, 'click', () => this.onSaveClick(parent));
    this.renderer.listen(this.cancelButton, 'click', () => this.onCancelClick(target, parent));
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
      this.renderer.listen(newSpan, 'click', (event: MouseEvent) => this.onPlaceholderClick(event));
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
      this.contractService.UpdateContractByKeys([{ newValue, contractKeyId: +key }],this.contract.contractId || 0).subscribe();
    }
  }
}
