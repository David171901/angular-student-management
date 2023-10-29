import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthPageComponent } from './modules/auth/pages/auth-page/auth-page.component';
import { HomePageComponent } from './modules/dashboard/home/pages/home-page/home-page.component';
import { sessionGuard } from './core/guards/session.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import(`./modules/auth/auth.module`).then(m => m.AuthModule),
  },
  {
    path: '',
    component: HomePageComponent,
    loadChildren: () => import(`./modules/dashboard/dashboard.module`).then(m => m.DashboardModule),
    canActivate:[sessionGuard],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
