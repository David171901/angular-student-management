import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollmentsFormComponent } from './enrollments-form.component';

describe('EnrollmentsFormComponent', () => {
  let component: EnrollmentsFormComponent;
  let fixture: ComponentFixture<EnrollmentsFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnrollmentsFormComponent]
    });
    fixture = TestBed.createComponent(EnrollmentsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
