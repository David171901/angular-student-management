import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersPageComponent } from './users/pages/users-page/users-page.component';
import { CoursesPageComponent } from './courses/pages/courses-page/courses-page.component';

const routes: Routes = [
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
