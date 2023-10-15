import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesPageComponent } from './pages/courses-page/courses-page.component';
import { CourseFormComponent } from './components/course-form/course-form.component';
import { CourseTableComponent } from './components/course-table/course-table.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CoursesPageComponent,
    CourseFormComponent,
    CourseTableComponent
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ]
})
export class CoursesModule { }
