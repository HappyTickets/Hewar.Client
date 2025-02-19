import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HewarServicesComponent } from './hewar-services.component';

describe('HewarServicesComponent', () => {
  let component: HewarServicesComponent;
  let fixture: ComponentFixture<HewarServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HewarServicesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HewarServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
