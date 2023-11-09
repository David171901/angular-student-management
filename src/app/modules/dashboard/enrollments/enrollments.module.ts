import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnrollmentsRoutingModule } from './enrollments-routing.module';
import { EnrollmentPageComponent } from './pages/enrollment-page/enrollment-page.component';
import { EnrollmentsFormComponent } from './components/enrollments-form/enrollments-form.component';
import { EnrollmentsTableComponent } from './components/enrollments-table/enrollments-table.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EnrollmentPageComponent,
    EnrollmentsFormComponent,
    EnrollmentsTableComponent
  ],
  imports: [
    CommonModule,
    EnrollmentsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ]
})
export class EnrollmentsModule { }
