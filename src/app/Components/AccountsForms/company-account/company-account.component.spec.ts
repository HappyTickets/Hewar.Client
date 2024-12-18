import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyAccountComponent } from './company-account.component';

describe('CompanyAccountComponent', () => {
  let component: CompanyAccountComponent;
  let fixture: ComponentFixture<CompanyAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyAccountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
