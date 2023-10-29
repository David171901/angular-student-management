import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersPageComponent } from './users/pages/users-page/users-page.component';
import { CoursesPageComponent } from './courses/pages/courses-page/courses-page.component';
import { ReportsPageComponent } from './reports/pages/reports-page/reports-page.component';
import { BoardPageComponent } from './board/pages/board-page/board-page.component';
import { EnrollmentsenPageComponent } from './enrollmentsen/pages/enrollmentsen-page/enrollmentsen-page.component';

const routes: Routes = [
  {
    path: 'board',
    component: BoardPageComponent,
    loadChildren: () => import(`./board/board.module`).then(m => m.BoardModule),
  },
  {
    path: 'users',
    component: UsersPageComponent,
    loadChildren: () => import(`./users/users.module`).then(m => m.UsersModule),
  },
  {
    path: 'courses',
    component: CoursesPageComponent,
    loadChildren: () => import(`./courses/courses.module`).then(m => m.CoursesModule),
  },
  {
    path: 'enrollmentsen',
    component: EnrollmentsenPageComponent,
    loadChildren: () => import(`./enrollmentsen/enrollmentsen.module`).then(m => m.EnrollmentsenModule),
  },
  {
    path: 'reports',
    component: ReportsPageComponent,
    loadChildren: () => import(`./reports/reports.module`).then(m => m.ReportsModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
