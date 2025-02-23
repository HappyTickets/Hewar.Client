import { Component, Input, OnInit, inject, OnDestroy } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IScheduleEntry } from '../../models/ischedule-entry';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { ScheduleEntriesService } from '../../services/schedule-entries.service';
import { IEditScheduleEntry } from '../../models/iedit-schedule-entry';
import { TranslatePipe } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { LocalizationService } from '../../../../core/services/localization/localization.service';

@Component({
  selector: 'app-schedule-entries',
  standalone: true,
  imports: [TableModule, FormsModule, ReactiveFormsModule, ButtonModule, InputTextModule, CommonModule, TranslatePipe],
  templateUrl: './schedule-entries.component.html',
  styleUrl: './schedule-entries.component.scss'
})
export class ScheduleEntriesComponent implements OnInit, OnDestroy {
  private localizationService = inject(LocalizationService);
  private scheduleEntriesService = inject(ScheduleEntriesService);
  private languageSubscription: Subscription;
  language: 'ar' | 'en' = 'ar';
  @Input() scheduleEntriesData: IScheduleEntry[] = [];
  @Input() contractId: number | null = null;
  ngOnInit(): void {
    this.scheduleEntriesData = this.scheduleEntriesData.map(entry => ({ ...entry, editing: false }));
  }
  constructor() {
    this.language = this.localizationService.getLanguage();
    this.languageSubscription = this.localizationService.language$.subscribe(
      lang => this.language = lang
    );
  }
  ngOnDestroy() {
    this.languageSubscription?.unsubscribe();
  }
  editEntry(entry: IScheduleEntry): void {
    entry.editing = true;
    entry.new = false;
  }
  saveEntry(entry: IScheduleEntry): void {
    const data: IEditScheduleEntry[] = [{
      locationAr: entry.locationAr,
      locationEn: entry.locationEn,
      guardsRequired: entry.guardsRequired,
      shiftTimeAr: entry.shiftTimeAr,
      shiftTimeEn: entry.shiftTimeEn,
      notesAr: entry.notesAr,
      notesEn: entry.notesEn,
    }]
    if (entry.new) {
      if (this.contractId) this.scheduleEntriesService.Create(data, this.contractId).subscribe();
    } else {
      data[0].id = entry.id;
      if (this.contractId) this.scheduleEntriesService.Update(data, this.contractId).subscribe();
    }
    entry.editing = false;
  }
  cancelEdit(entry: IScheduleEntry): void {
    entry.editing = false;
  }
  removeEntry(index: number, entry: IScheduleEntry): void {
    this.scheduleEntriesData.splice(index, 1);
    this.scheduleEntriesService.Delete(entry.id || 0).subscribe();
  }
  getSchedualingEntries() {
    if (this.contractId) this.scheduleEntriesService.GetByContractId(this.contractId).subscribe(res => {
      if (res.data) this.scheduleEntriesData = res.data;
    });
  }
  addNewEntry(): void {
    this.scheduleEntriesData.push({
      locationAr: '',
      locationEn: '',
      guardsRequired: 0,
      shiftTimeAr: '',
      shiftTimeEn: '',
      notesAr: '',
      notesEn: '',
      editing: true,
      new: true
    });
  }
}
