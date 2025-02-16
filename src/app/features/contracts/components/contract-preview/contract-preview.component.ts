import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ContractsService } from '../../services/contracts.service';
import { IContractTemplate } from '../../models/icontract-template';
import { CommonModule } from '@angular/common';
import { EditorModule } from 'primeng/editor';
@Component({
  selector: 'app-contract-preview',
  standalone: true,
  imports: [CommonModule, EditorModule, ReactiveFormsModule],
  templateUrl: './contract-preview.component.html',
  styleUrl: './contract-preview.component.scss',
})
export class ContractPreviewComponent implements OnInit {
  private contractsService = inject(ContractsService);
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);
  date = new Date(Date.now());
  contractForm!: FormGroup;
  contractId = 0;
  contractTemplate: IContractTemplate = {} as IContractTemplate;
  formGroup: FormGroup = new FormGroup({
    text: new FormControl()
  });

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.contractId = +(params.get('id') ?? 0);
      this.contractsService.getContractTemplateById(this.contractId).subscribe(res => {
        if (res.data) {
          this.contractTemplate = res.data;
          console.log(res.data);

          const formattedText = this.generateContractHTML(res.data);
          this.formGroup.patchValue({ text: formattedText });
        }
      });
    });
  }
  generateContractHTML(contract: IContractTemplate): string {
    return `
      <h2 style="text-align: center;">${contract.contractTitle.ar}</h2>
      <h5>أبرم هذا العقد بين كل من :</h5>
      
      <h5>الطرف الأول:</h5>
      <p style="font-size: 16px">${contract.preamble.parties.firstParty.description.ar}</p>

      <h5>الطرف الثاني:</h5>
      <p>${contract.preamble.parties.secondParty.description.ar}</p>

      <h5>مقدمة:</h5>
      <p>${contract.preamble.introduction.ar}</p>

      <h5>الشروط:</h5>
      <ul>
        ${contract.preamble.conditions.map(cond => `<li>${cond.ar}</li>`).join('')}
      </ul>

      <h5>بنود العقد:</h5>
      ${contract.clauses.map(clause => `
        <h4>${clause.number}. ${clause.title.ar}</h4>
        <p>${clause.ar}</p>
      `).join('')}

      <h5>الخدمات المطلوبة:</h5>
      <table border="1" width="100%" style="border-collapse: collapse; text-align: center;">
        <tr>
          <th>الموقع</th>
          <th>عدد الحراس</th>
          <th>وقت الوردية</th>
        </tr>
        ${contract.scheduleEntries.map(entry => `
          <tr>
            <td>${entry.location.ar}</td>
            <td>${entry.guardsRequired.ar}</td>
            <td>${entry.shiftTime.ar}</td>
          </tr>
        `).join('')}
      </table>

      <h5>الخدمات الإضافية:</h5>
      <ul>
        ${contract.otherServicesOffer.map(service => `
          <li>${service.name} - ${service.quantity} وحدة</li>
        `).join('')}
      </ul>

      <h5>الواجبات والخدمات:</h5>
      <ul>
        ${contract.duties_Services.map(duty => `<li>${duty.ar}</li>`).join('')}
      </ul>

      <h5>الخاتمة:</h5>
      <p>${contract.closingRemark.ar}</p>

      <h5>التوقيعات:</h5>
      <p>توقيع الطرف الأول: ${contract.signatures.partyOneSignature}</p>
      <p>توقيع الطرف الثاني: ${contract.signatures.partyTwoSignature}</p>
    `;
  }
}
