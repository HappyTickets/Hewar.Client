import { Component, OnInit, Renderer2, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { TranslatePipe } from '@ngx-translate/core';
import { LocalizationService } from '../../../../core/services/localization/localization.service';
import { ContractService } from '../../services/contract.service';
import { ContractDispayServiceComponent } from '../contract-dispay-service/contract-dispay-service.component';
import { ContractSignatureComponent } from '../contract-signature/contract-signature.component';
import { ScheduleEntriesComponent } from '../schedule-entries/schedule-entries.component';
import { CustomClausesComponent } from '../custom-clauses/custom-clauses.component';
import { IContractTemplate } from '../../models/icontract-template';
import { IContractKey } from '../../models/icontract-key';
import { ScheduleEntriesService } from '../../services/schedule-entries.service';
import { ClausesService } from '../../services/clauses.service';

@Component({
  selector: 'app-contract-preview',
  standalone: true,
  imports: [ CommonModule, ScheduleEntriesComponent, ContractDispayServiceComponent, CustomClausesComponent, ContractSignatureComponent, TranslatePipe ],
  templateUrl: './contract-preview.component.html',
  styleUrls: ['./contract-preview.component.scss'],
})
export class ContractPreviewComponent implements OnInit, OnDestroy {
  private scheduleEntriesService = inject(ScheduleEntriesService);
  private clausesService = inject(ClausesService);
  private localizationService = inject(LocalizationService);
  private contractService = inject(ContractService);
  private route = inject(ActivatedRoute);
  private renderer = inject(Renderer2);
  private languageSubscription!: Subscription;
  contract: IContractTemplate = {} as IContractTemplate;
  language: 'ar' | 'en' = 'ar';
  private placeholderInput: HTMLInputElement | null = null;
  private saveButton: HTMLButtonElement | null = null;
  private cancelButton: HTMLButtonElement | null = null;
  private editingKey: string | null = null;
  private editingValue: string | null = null;
  constructor() {
    this.language = this.localizationService.getLanguage();
  }
  ngOnInit(): void {
    this.subscribeToLanguageChanges();
    this.fetchContractData();
  }
  ngOnDestroy(): void {
    this.languageSubscription?.unsubscribe();
  }
  private subscribeToLanguageChanges(): void {
    this.languageSubscription = this.localizationService.language$.subscribe(lang => {
      this.language = lang;
      if (this.contract.contractId) {
        this.replacePlaceholders();
      }
    });
  }
  private fetchContractData(): void {
    this.route.paramMap.subscribe(params => {
      const offerId = Number(params.get('id') ?? -1);
      if (offerId > -1) {
        this.contractService.GetByOfferId(offerId).subscribe(res => {
          if (res.data) {
            this.contract = res.data;
            this.replacePlaceholders();
          }
        });
      }
    });
  }
  private replacePlaceholders(): void {
    const keysMap = this.contract.contractKeys.reduce<Record<string, IContractKey>>((acc, key) => ({ ...acc, [key.keyName]: key }),{});
    if (this.language === 'ar') {
      this.contract.staticContractTemplate.preambleAr = this.replaceKeys(this.contract.staticContractTemplate.preambleAr, keysMap);
      this.contract.staticContractTemplate.closingRemarkAr = this.replaceKeys(this.contract.staticContractTemplate.closingRemarkAr, keysMap);
      this.contract.staticClauses.forEach(clause => clause.contentAr = this.replaceKeys(clause.contentAr, keysMap));
    } else {
      this.contract.staticContractTemplate.preambleEn = this.replaceKeys(this.contract.staticContractTemplate.preambleEn, keysMap);
      this.contract.staticContractTemplate.closingRemarkEn = this.replaceKeys(this.contract.staticContractTemplate.closingRemarkEn, keysMap);
      this.contract.staticClauses.forEach(clause => clause.contentEn = this.replaceKeys(clause.contentEn, keysMap));
    }
  }
  private replaceKeys(text: string, keys: Record<string, IContractKey>): string {
    return text.replace(/{{(.*?)}}/g, (_, key) => {
      const trimmedKey = key.trim();
      const keyDetails = keys[trimmedKey];
      if (trimmedKey === 'OfferNumber') {
        return `<span>${this.contract.offerNumber}</span>`;
      } else if (trimmedKey === 'OfferDate') {
        return `<span>${new Date(this.contract.offerDate).toLocaleDateString('en-GB')}</span>`;
      }
      return keyDetails ? `<span class="placeholder-key ${keyDetails.id}" [attr.id]="${keyDetails.id}">${keyDetails.value}</span>` : `<span class="placeholder-key">${trimmedKey}</span>`;}).replace(/\n/g, '<br>');
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
    const keyId = target.classList[1];
    const contractKey = this.contract.contractKeys.find(k => k.id === +keyId);
    if (!contractKey) return;
    this.createInputField(contractKey);
    this.createActionButtons();
    this.renderer.insertBefore(parent, this.placeholderInput, target);
    this.renderer.insertBefore(parent, this.saveButton, target);
    this.renderer.insertBefore(parent, this.cancelButton, target);
    this.renderer.removeChild(parent, target);
    this.renderer.listen(this.saveButton, 'click', () => this.onSaveClick(parent));
    this.renderer.listen(this.cancelButton, 'click', () => this.onCancelClick(target, parent));
  }
  private createInputField(contractKey: IContractKey): void {
    this.placeholderInput = this.renderer.createElement('input') as HTMLInputElement;
    this.renderer.addClass(this.placeholderInput, 'placeholder-input');
    switch (contractKey.dataType) {
      case 0: this.placeholderInput.type = 'number';break;
      case 1: this.placeholderInput.type = 'date';this.placeholderInput.value = new Date(this.editingValue || '').toISOString().split('T')[0];break;
      default: this.placeholderInput.type = 'text';
    }
    this.placeholderInput.value = this.editingValue || '';
  }
  private createActionButtons(): void {
    this.saveButton = this.createButton('Save', 'save-button');
    this.cancelButton = this.createButton('Cancel', 'cancel-button');
  }
  private createButton(text: string, className: string): HTMLButtonElement {
    const button = this.renderer.createElement('button') as HTMLButtonElement;
    this.renderer.addClass(button, className);
    this.renderer.setProperty(button, 'innerText', text);
    return button;
  }
  private onSaveClick(parent: HTMLElement): void {
    if (!this.placeholderInput || !this.editingKey) return;
    const newValue = this.placeholderInput.value;
    this.updateContractKey(this.editingKey, newValue);
    const newSpan = this.renderer.createElement('span');
    this.renderer.addClass(newSpan, 'placeholder-key');
    this.renderer.addClass(newSpan, this.editingKey);
    this.renderer.setProperty(newSpan, 'innerText', newValue);
    this.renderer.listen(newSpan, 'click', event => this.onPlaceholderClick(event));
    this.renderer.insertBefore(parent, newSpan, this.placeholderInput);
    this.cleanUpFields(parent);
  }
  private onCancelClick(target: HTMLElement, parent: HTMLElement): void {
    this.renderer.insertBefore(parent, target, this.placeholderInput);
    this.cleanUpFields(parent);
  }
  private cleanUpFields(parent: HTMLElement): void {
    this.renderer.removeChild(parent, this.placeholderInput);
    this.renderer.removeChild(parent, this.saveButton);
    this.renderer.removeChild(parent, this.cancelButton);
    this.placeholderInput = this.saveButton = this.cancelButton = null;
    this.editingKey = this.editingValue = null;
  }
  private updateContractKey(key: string, newValue: string): void {
    const contractKey = this.contract.contractKeys.find(k => k.id === +key);
    if (contractKey) {
      contractKey.value = newValue;
      this.contractService.UpdateContractByKeys([{ newValue, contractKeyId: +key }], this.contract.contractId || 0).subscribe();
    }
  }
}
