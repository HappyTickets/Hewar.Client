import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomClausesComponent } from './custom-clauses.component';

describe('CustomClausesComponent', () => {
  let component: CustomClausesComponent;
  let fixture: ComponentFixture<CustomClausesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomClausesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomClausesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
