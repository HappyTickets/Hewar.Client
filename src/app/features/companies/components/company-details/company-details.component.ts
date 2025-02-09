import { Component, OnInit } from '@angular/core';
import { CompaniesService } from '../../services/companies.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ICompany } from '../../models/ICompany';
import { TranslateModule } from '@ngx-translate/core';
import { DeletePopupComponent } from '../../../../shared/components/delete-popup/delete-popup.component';

@Component({
  selector: 'app-company-details',
  standalone: true,
  imports: [
    TranslateModule,
    DeletePopupComponent,
    RouterLink
  ],
  templateUrl: './company-details.component.html',
  styleUrl: './company-details.component.scss'
})
export class CompanyDetailsComponent implements OnInit {
  currentCompanyID :string | null = ''
  currentCompany:ICompany | undefined;
  showDeletePopup = false;
  companyToDelete!: ICompany;

  constructor (private _companiesService:CompaniesService, private _route: ActivatedRoute) {
  }
  ngOnInit(): void {
    this.currentCompanyID = this._route.snapshot.paramMap.get('id');
    this._companiesService.getCompanyById(this.currentCompanyID!).subscribe({
      next: (res) => {
        if (res.data) {
          this.currentCompany = res.data
        }
        console.log(this.currentCompany )
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  openDeletePopup(company: ICompany) {
    this.companyToDelete = company;
    this.showDeletePopup = true;
    console.log(this.companyToDelete)
  }

  confirmDelete() {
    console.log(`Deleting company: ${this.companyToDelete.name}`);
    this._companiesService.deleteCompany(this.companyToDelete.id).subscribe({
      next: (res) => {
        console.log(res)
      },
      error: (err) => {
        console.log(err)
      }
    })
    this.showDeletePopup = false;
  }
}
