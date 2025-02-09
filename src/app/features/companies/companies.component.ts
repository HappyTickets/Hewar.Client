import { Component, OnInit } from '@angular/core';
import { CompaniesService } from './services/companies.service';
import { ICompany } from './models/ICompany';
import { FormsModule } from '@angular/forms';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext'
import { Router, RouterLink } from '@angular/router';
import { DeletePopupComponent } from "../../shared/components/delete-popup/delete-popup.component";
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-companies',
  standalone: true,
  imports: [FormsModule, PaginatorModule, CommonModule, ButtonModule, InputTextModule, RouterLink, DeletePopupComponent, TranslateModule],
  templateUrl: './companies.component.html',
  styleUrl: './companies.component.scss'
})
export class CompaniesComponent implements OnInit {
  companies: ICompany[] = [];
  showSec = 'الامن الصناعي'
  searchValue = '';
  first = 0;
  rows = 10;
  totalRecords = 20
  showDeletePopup = false;
  companyToDelete!: ICompany;

  constructor(private _companiesService:CompaniesService, private _router: Router){}
  ngOnInit(): void {
    this.getAllCompanies()
  }
  getAllCompanies(){
    this._companiesService.getAllCompanies().subscribe({
      next: (res) => {
        if (res.data) {
          this.companies = res.data
        }
      },
      error: (err) => {
        console.log(err)
      },
      complete: () => {
        console.log("companies: " + this.companies)
      }
    })
  }

  // toggle between [الامن الصناعي- امن المنشأت]
  showSec01(){
    this.showSec = 'الامن الصناعي'
  }
  showSec02(){
    this.showSec = 'امن المنشأت'
  }
  // filter using search input
  filteredCards() {
    if (!this.searchValue) {
      return this.companies; // Return all cards if no search value
    }
    const search = this.searchValue.toLowerCase();
    return this.companies.filter(company =>
      company.name.toLowerCase().includes(search)
    );
  }
  onPageChange(event: PaginatorState): void {
    this.first = event.first ?? 0;
    this.rows = event.rows ?? 5;
  }

  openDeletePopup(company: ICompany) {
    this.companyToDelete = company;
    this.showDeletePopup = true;
    // console.log(this.companyToDelete)
  }

  confirmDelete() {
    console.log(`Deleting company: ${this.companyToDelete.name}`);
    this._companiesService.deleteCompany(this.companyToDelete.id).subscribe({
      next: (res) => {
        console.log(res)
      },
      error: (err) => {
        console.log(err)
      },
      complete: () => {
        this.getAllCompanies()
      }
    })
    this.showDeletePopup = false;
  }

  // showDialog(company:ICompany) {
  //   this.visibleDeletePopup = true;
  //   this.currentCompany = company
  //   this.companyName = company.name
  // }
  // deleteCompany(){
  //   this.visibleDeletePopup = false;
  //   this._companiesService.deleteCompany(this.currentCompany.id).subscribe({
  //     next: (res) => {
  //       console.log(res)
  //     },
  //     error: (err) => {
  //       console.log(err)
  //     },
  //     complete: () => {
  //       this.getAllCompanies()
  //     }
  //   })
  // }
}
