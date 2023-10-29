import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnrollmentsenRoutingModule } from './enrollmentsen-routing.module';
import { EnrollmentsenPageComponent } from './pages/enrollmentsen-page/enrollmentsen-page.component';


@NgModule({
  declarations: [
    EnrollmentsenPageComponent
  ],
  imports: [
    CommonModule,
    EnrollmentsenRoutingModule
  ]
})
export class EnrollmentsenModule { }
