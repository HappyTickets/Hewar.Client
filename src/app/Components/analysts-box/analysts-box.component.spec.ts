import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalystsBoxComponent } from './analysts-box.component';

describe('AnalystsBoxComponent', () => {
  let component: AnalystsBoxComponent;
  let fixture: ComponentFixture<AnalystsBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalystsBoxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalystsBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
