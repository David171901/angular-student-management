import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    UsersPageComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule
  ]
})
export class UsersModule { }
