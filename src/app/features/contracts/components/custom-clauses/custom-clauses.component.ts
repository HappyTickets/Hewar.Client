import { Component, inject, Input, OnInit, OnDestroy } from '@angular/core';
import { IClause } from '../../models/iclause';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TranslatePipe } from '@ngx-translate/core';
import { ClausesService } from '../../services/clauses.service';
import { FormsModule } from '@angular/forms';
import { LocalizationService } from '../../../../core/services/localization/localization.service';
import { TextareaModule } from 'primeng/textarea';
import { Subscription } from 'rxjs';
import { EditorModule } from 'primeng/editor';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
@Component({
  selector: 'app-custom-clauses',
  standalone: true,
  imports: [CommonModule, ButtonModule, InputTextModule, TableModule, TranslatePipe, FormsModule, TextareaModule, TranslatePipe, EditorModule ],
  templateUrl: './custom-clauses.component.html',
  styleUrl: './custom-clauses.component.scss'
})
export class CustomClausesComponent implements OnInit, OnDestroy {
  private localizationService = inject(LocalizationService);
  private clausesService = inject(ClausesService);
  private sanitizer = inject(DomSanitizer);
  private languageSubscription: Subscription;
  @Input() customClausesData: IClause[] = [];
  @Input() contractId: number | null = null;
  language: 'ar' | 'en' = 'ar';

  constructor() {
    this.language = this.localizationService.getLanguage();
    this.languageSubscription = this.localizationService.language$.subscribe(
      lang => this.language = lang
    );
  }
  ngOnDestroy() {
    this.languageSubscription?.unsubscribe();
  }
  getSafeHtml(content: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }
  ngOnInit(): void {
    this.language = this.localizationService.getLanguage();
    this.customClausesData = this.customClausesData.map(entry => ({ ...entry, editing: false }));
  }
  editClause(clause: IClause): void {
    clause.editing = true;
    clause.new = false;
  }
  saveClause(clause: IClause): void {
    const data: IClause[] = [{
      htmlContentAr: clause.htmlContentAr,
      htmlContentEn: clause.htmlContentEn,
    }]
    if (clause.new) {
      if (this.contractId) this.clausesService.CreateCustomClauses(data, this.contractId).subscribe();
    } else {
      data[0].id = clause.id;
      if (this.contractId) this.clausesService.UpdateCustomClauses(data, this.contractId).subscribe();
    }
    clause.editing = false;
  }
  cancelEdit(clause: IClause, index: number): void {
    clause.editing = false;
    if (clause.new) {
      this.customClausesData.splice(index, 1);
    }
  }
  removeClause(index: number, clause: IClause): void {
    this.customClausesData.splice(index, 1);
    this.clausesService.DeleteCustomClause(clause.id || 0).subscribe();
  }
  getSchedualingEntries() {
    if (this.contractId) this.clausesService.GetCustomClausesByContractId(this.contractId).subscribe(res => {
      if (res.data) this.customClausesData = res.data;
    });
  }
  addNewEntry(): void {
    this.customClausesData.push({
      htmlContentAr: '',
      htmlContentEn: '',
      editing: true,
      new: true
    });
  }
}
