import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CompaniesService } from '../../Services/companies.service';
@Component({
  selector: 'app-company-details',
  standalone: true,
  imports: [
    TranslateModule,
    RouterLink
  ],
  templateUrl: './company-details.component.html',
  styleUrl: './company-details.component.scss'
})
export class CompanyDetailsComponent {
    companyId!:string;
    company:any;

    constructor(private companiesService:CompaniesService, private activatedRoute: ActivatedRoute,) { }
    ngOnInit() {
      this.activatedRoute.queryParamMap.subscribe((params) => {
        this.companyId = params.get('id') || '';
      });

      this.companiesService.getById(this.companyId).subscribe({
        next: (res:any)=>{
          console.log(res.data)
          this.company = res.data;
        },
        error:(error)=>{
          console.log(error);
        }
      })
    }

}
