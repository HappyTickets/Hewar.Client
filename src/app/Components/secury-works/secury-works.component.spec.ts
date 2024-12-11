import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecuryWorksComponent } from './secury-works.component';

describe('SecuryWorksComponent', () => {
  let component: SecuryWorksComponent;
  let fixture: ComponentFixture<SecuryWorksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecuryWorksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecuryWorksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
