import { Attribute, Component, OnDestroy, OnInit } from '@angular/core';
import { FacilitiesService } from '../services/facilities.service';
import { CommonModule } from '@angular/common';
import { IResponseData } from '../models/iresponse-data';
import { Route, Router, RouterLink, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { Dialog } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { LocalizationService } from '../../../core/services/localization/localization.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { TranslateModule } from '@ngx-translate/core';
import { DeletePopupComponent } from '../../../shared/components/delete-popup/delete-popup.component';

@Component({
  selector: 'app-list-facility',
  standalone: true,
  imports: [
    FormsModule,
    PaginatorModule,
    CommonModule,
    Dialog,
    ButtonModule,
    InputTextModule,
    RouterLink,
    TranslateModule,
    RouterModule,
    DeletePopupComponent,
  ],
  templateUrl: './list-facility.component.html',
  styleUrl: './list-facility.component.scss',
})
export class ListFacilityComponent implements OnInit, OnDestroy {
  language!: 'ar' | 'en';
  private languageSubscription: Subscription;
  first = 0;
  rows = 10;
  totalRecords = 20;
  facilities: IResponseData[] = [];
  searchValue = '';
  visibleDeletePopup = false;
  showDeletePopup = false;

  currentCard!: IResponseData;
  constructor(
    private facilityService: FacilitiesService,
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
    this.facilityService.getAllFacilities().subscribe((res) => {
      this.facilities = res.data;
      console.log(this.facilities);
    });
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
  }
  onPageChange(event: PaginatorState): void {
    this.first = event.first ?? 0;
    this.rows = event.rows ?? 5;
  }
  filteredCards() {
    if (!this.searchValue) {
      return this.facilities; // Return all cards if no search value
    }
    const search = this.searchValue.toLowerCase();
    return this.facilities.filter((card) =>
      card.name.toLowerCase().includes(search)
    );
  }
  // showDialog(card: IResponseData) {
  //   this.visibleDeletePopup = true;
  //   this.currentCard = card;
  // }
  updateFacility(facilityId: number) {
    this.router.navigate(['/update-facility', facilityId]);
  }

  deletFacility(id: number) {
    this.visibleDeletePopup = false;
    this.facilityService.softDeleteFacility(this.currentCard.id).subscribe({
      next: (res) => {
        console.log(res);
        this.facilityService.getAllFacilities().subscribe((res) => {
          this.facilities = res.data;
        });
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        // this.getAllCompanies()
      },
    });
  }
  openDeletePopup(facility: IResponseData) {
    this.showDeletePopup = true;
  }
  // private setDirection(lang: 'ar' | 'en') {
  //   const section = document.getElementById('facilities-section');
  //   if (section) {
  //     section.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
  //   }
  //   console.log('Direction set to:', lang === 'ar' ? 'rtl' : 'ltr');
  // }

  goToFacilityDetails(facilityId: number) {
    this.router.navigate(['/facilities', facilityId]); // Example: /facilities/1
  }
}
