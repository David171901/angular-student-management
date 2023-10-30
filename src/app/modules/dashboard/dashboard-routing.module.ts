import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesPageComponent } from './courses/pages/courses-page/courses-page.component';
import { ReportsPageComponent } from './reports/pages/reports-page/reports-page.component';
import { BoardPageComponent } from './board/pages/board-page/board-page.component';
import { EnrollmentPageComponent } from './enrollments/pages/enrollment-page/enrollment-page.component';

const routes: Routes = [
  {
    path: 'board',
    component: BoardPageComponent,
    loadChildren: () => import(`./board/board.module`).then(m => m.BoardModule),
  },
  {
    path: 'students',
    loadChildren: () => import(`./students/students.module`).then(m => m.StudentsModule),
  },
  {
    path: 'courses',
    component: CoursesPageComponent,
    loadChildren: () => import(`./courses/courses.module`).then(m => m.CoursesModule),
  },
  {
    path: 'enrollments',
    component: EnrollmentPageComponent,
    loadChildren: () => import(`./enrollments/enrollments.module`).then(m => m.EnrollmentsModule),
  },
  {
    path: 'reports',
    component: ReportsPageComponent,
    loadChildren: () => import(`./reports/reports.module`).then(m => m.ReportsModule),
  },
  {
    path: '**',
    redirectTo: 'board'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
