import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnrollmentsRoutingModule } from './enrollments-routing.module';
import { EnrollmentPageComponent } from './pages/enrollment-page/enrollment-page.component';


@NgModule({
  declarations: [
    EnrollmentPageComponent
  ],
  imports: [
    CommonModule,
    EnrollmentsRoutingModule
  ]
})
export class EnrollmentsModule { }
