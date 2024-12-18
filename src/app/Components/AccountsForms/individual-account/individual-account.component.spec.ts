import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualAccountComponent } from './individual-account.component';

describe('IndividualAccountComponent', () => {
  let component: IndividualAccountComponent;
  let fixture: ComponentFixture<IndividualAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndividualAccountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndividualAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
