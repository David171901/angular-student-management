import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersPageComponent } from './pages/users-page/users-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserTableComponent } from './components/user-table/user-table.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserDetailPageComponent } from './pages/user-detail-page/user-detail-page.component';
import { StudentsRoutingModule } from './students-routing.module';

@NgModule({
  declarations: [
    UsersPageComponent,
    UserFormComponent,
    UserTableComponent,
    UserDetailPageComponent,
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ]
})
export class StudentsModule { }
