import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractPreviewComponent } from './contract-preview.component';

describe('ContractPreviewComponent', () => {
  let component: ContractPreviewComponent;
  let fixture: ComponentFixture<ContractPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContractPreviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContractPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
