import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';
import { TranslateModule } from '@ngx-translate/core';
import { DeletePopupComponent } from '../../shared/components/delete-popup/delete-popup.component';
import { LocalizationService } from '../../core/services/localization/localization.service';
import { CompaniesService } from './services/companies.service';
import { ICompany } from './models/ICompany';

@Component({
  selector: 'app-companies',
  standalone: true,
  imports: [
      FormsModule,
      PaginatorModule,
      CommonModule,
      ButtonModule,
      InputTextModule,
      RouterLink,
      TranslateModule,
      RouterModule,
      DeletePopupComponent,
  ],
  templateUrl: './companies.component.html',
  styleUrl: './companies.component.scss'
})
export class CompaniesComponent implements OnInit {
  language!: 'ar' | 'en';
  languageSubscription: Subscription;
  first = 0;
  rows = 10;
  totalRecords:number | undefined = 0;
  companies: ICompany[] | null = [];
  searchValue = '';
  visibleDeletePopup = false;
  showDeletePopup = false;

  currentCompany!: ICompany;
  constructor(
    private _companiesService: CompaniesService,
    private localizationService: LocalizationService,
    private router: Router
  ) {
    this.language = this.localizationService.getLanguage();
    this.languageSubscription = this.localizationService.language$.subscribe(
      (lang) => {
        {
          this.language = lang;
        }
      }
    );
  }
  ngOnInit(): void {
    this.getAllCompanies()
  }
  onPageChange(event: PaginatorState): void {
    this.first = event.first ?? 0;
    this.rows = event.rows ?? 5;
  }
  getAllCompanies(){
    this._companiesService.getAllCompanies().subscribe((res) => {
      this.companies = res.data
      console.log(res.data?.length);
      this.totalRecords = res.data?.length;
    });
  }
  filteredCards() {
    if (!this.searchValue) {
      return this.companies;
    }
    const search = this.searchValue.toLowerCase();
    return this.companies?.filter((card) =>
      card.name.toLowerCase().includes(search)
    );
  }
  updateFacility(facilityId: number) {
    this.router.navigate(['/update-facility', facilityId]);
  }

  deleteFacility() {
    this.visibleDeletePopup = false;
    this.showDeletePopup = false;
    this._companiesService.deleteCompany(this.currentCompany.id).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        this.getAllCompanies()
      },
    });
  }
  openDeletePopup(company: ICompany) {
    document.body.classList.remove('card-scale');
    this.currentCompany = company;
    this.showDeletePopup = true;
  }
  goToFacilityDetails(facilityId: number) {
    this.router.navigate(['/facilities', facilityId]);
  }
}
