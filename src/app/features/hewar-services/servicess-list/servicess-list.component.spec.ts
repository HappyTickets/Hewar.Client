import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicessListComponent } from './servicess-list.component';

describe('ServicessListComponent', () => {
  let component: ServicessListComponent;
  let fixture: ComponentFixture<ServicessListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicessListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicessListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
