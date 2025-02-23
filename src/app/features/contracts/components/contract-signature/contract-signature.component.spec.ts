import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractSignatureComponent } from './contract-signature.component';

describe('ContractSignatureComponent', () => {
  let component: ContractSignatureComponent;
  let fixture: ComponentFixture<ContractSignatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContractSignatureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContractSignatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
