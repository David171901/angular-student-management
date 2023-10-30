import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserTableComponent } from './components/user-table/user-table.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserDetailPageComponent } from './pages/user-detail-page/user-detail-page.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    UsersPageComponent,
    UserFormComponent,
    UserTableComponent,
    UserDetailPageComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MatSnackBarModule,
  ]
})
export class UsersModule { }
