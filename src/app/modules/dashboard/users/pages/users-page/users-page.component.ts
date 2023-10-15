import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserFormComponent } from '../../components/user-form/user-form.component';
import { User } from 'src/app/core/user';
import { UsersService } from 'src/app/services/users.service';
import { MatTableDataSource, MatTableDataSourcePaginator } from '@angular/material/table';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.css']
})
export class UsersPageComponent {

  constructor() { }

}
