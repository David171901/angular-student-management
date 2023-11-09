import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollmentsTableComponent } from './enrollments-table.component';

describe('EnrollmentsTableComponent', () => {
  let component: EnrollmentsTableComponent;
  let fixture: ComponentFixture<EnrollmentsTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnrollmentsTableComponent]
    });
    fixture = TestBed.createComponent(EnrollmentsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
