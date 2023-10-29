import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollmentsenPageComponent } from './enrollmentsen-page.component';

describe('EnrollmentsenPageComponent', () => {
  let component: EnrollmentsenPageComponent;
  let fixture: ComponentFixture<EnrollmentsenPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnrollmentsenPageComponent]
    });
    fixture = TestBed.createComponent(EnrollmentsenPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
