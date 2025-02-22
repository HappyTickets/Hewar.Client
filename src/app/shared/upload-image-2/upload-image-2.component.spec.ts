import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadImage2Component } from './upload-image-2.component';

describe('UploadImage2Component', () => {
  let component: UploadImage2Component;
  let fixture: ComponentFixture<UploadImage2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadImage2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadImage2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
