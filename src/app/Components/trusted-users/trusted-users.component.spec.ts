import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrustedUsersComponent } from './trusted-users.component';

describe('TrustedUsersComponent', () => {
  let component: TrustedUsersComponent;
  let fixture: ComponentFixture<TrustedUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrustedUsersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrustedUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
