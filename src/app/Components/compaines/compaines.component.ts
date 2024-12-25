import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FadeInViewDirective } from '../../Directives/fade-in-view.directive';
import { TranslateModule } from '@ngx-translate/core';
import { CompaniesService } from '../../Services/companies.service';
import { PaginatorComponent } from '../../ReusableComponents/paginator/paginator.component';
@Component({
  selector: 'app-compaines',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, 
    FadeInViewDirective,
    TranslateModule,
    PaginatorComponent
  ],
templateUrl: './compaines.component.html',
  styleUrl: './compaines.component.scss'
})
export class CompainesComponent implements OnInit{
  companies!:any;
  filterText: string = '';
  filteredCompanies:any;

  items: any[] = [];
  itemsPerPage: number = 3;
  paginatedItems: any

  constructor(private companiesService:CompaniesService, private router: Router) { }
  ngOnInit() {
    this.companiesService.getAll().subscribe({
      next: (res: any) => {
        this.companies = res.data;
        this.filteredCompanies = this.companies;
        this.items = [...this.filteredCompanies];
        this.updatePaginatedItems(1);
      },
    });
  }

  goToDetails(id:number){
    this.router.navigate([`companyDetails`], {
      queryParams: { id: id },
    });
  }

  normalizeText(text: string): string {
    return text
      .normalize('NFD')
      .replace(/[\u064B-\u065F]/g, '')
      .replace(/[\u0621-\u0625]/g, 'ا')
      .replace(/[\u0649\u064A]/g, 'ي');
  }
  
  onFilter() {
    const textToUpperCase = this.normalizeText(this.filterText.toUpperCase());
      this.filteredCompanies = this.companies.filter((company: any) => 
      company.name.toUpperCase().includes(textToUpperCase)
    );
    this.items = [...this.filteredCompanies];
    this.updatePaginatedItems(1);
  }
  
  onPageChange(page: number): void {
    this.updatePaginatedItems(page);
  }
  
  updatePaginatedItems(page: number): void {
    const startIndex = (page - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedItems = this.items.slice(startIndex, endIndex);
  }

}
