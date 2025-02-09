import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FacilitiesService } from '../services/facilities.service';
import { CommonModule } from '@angular/common';
import { LocalizationService } from '../../../core/services/localization/localization.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { TranslateModule } from '@ngx-translate/core';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { IResponseData } from '../models/iresponse-data';
import { DeletePopupComponent } from '../../../shared/components/delete-popup/delete-popup.component';

@Component({
  selector: 'app-detials-facility',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    Dialog,
    ButtonModule,
    RouterLink,
    DeletePopupComponent,
  ],
  templateUrl: './detials-facility.component.html',
  styleUrl: './detials-facility.component.scss',
})
export class DetialsFacilityComponent implements OnInit {
  facilityId: number | null = null;
  facility: any;
  language!: 'ar' | 'en';
  visibleDeletePopup = false;
  showDeletePopup = false;
  currentCard!: IResponseData;
  private languageSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private facilitiesService: FacilitiesService,
    private router: Router,
    private localizationService: LocalizationService
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

  ngOnInit() {
    this.facilityId = Number(this.route.snapshot.paramMap.get('id'));
    console.log('Facility ID:', this.facilityId);
    this.getFacilityDetails();
  }
  getFacilityDetails() {
    if (this.facilityId !== null) {
      this.facilitiesService
        .getFacilityById(this.facilityId)
        .subscribe((res) => {
          console.log(res);
          this.facility = res.data;
        });
    }
  }
  editFacility(facilityId: number): void {
    // Navigate to the edit page, passing the facilityId as a parameter
    this.router.navigate(['/facility/edit', facilityId]);
  }
  openDeletePopup(facility: IResponseData) {
    document.body.classList.remove('card-scale');
    this.currentCard = facility;
    this.showDeletePopup = true;
  }

  deleteFacility(facilityId: number): void {
    this.visibleDeletePopup = false;
    this.showDeletePopup = false;

    if (facilityId != null) {
      this.visibleDeletePopup = false;
      this.facilitiesService.softDeleteFacility(this.facilityId!).subscribe({
        next: (res) => {
          console.log(res);
          this.facilitiesService.getAllFacilities().subscribe((res) => {});
          this.router.navigate(['/facilities']);
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          // this.getAllCompanies()
        },
      });
    }
  }
  showDialog(card: IResponseData) {
    this.visibleDeletePopup = true;
  }

  goBack(): void {
    // Navigate back to the list of facilities
    this.router.navigate(['/facilities']);
  }
  updateFacility(facilityId: number) {
    this.router.navigate(['/update-facility', facilityId]);
  }
}
