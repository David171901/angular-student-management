import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserFormComponent } from '../../components/user-form/user-form.component';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.css']
})
export class UsersPageComponent {

  constructor(public _dialog: MatDialog) { }


  openAddEditEmpForm() {
    const dialogRef = this._dialog.open(UserFormComponent);
  }
}
