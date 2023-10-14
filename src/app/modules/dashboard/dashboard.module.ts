import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeModule } from './home/home.module';
import { UsersModule } from './users/users.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    HomeModule,
    UsersModule,
  ]
})
export class DashboardModule { }
