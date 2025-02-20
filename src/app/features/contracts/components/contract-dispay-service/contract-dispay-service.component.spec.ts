import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractDispayServiceComponent } from './contract-dispay-service.component';

describe('ContractDispayServiceComponent', () => {
  let component: ContractDispayServiceComponent;
  let fixture: ComponentFixture<ContractDispayServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContractDispayServiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContractDispayServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
