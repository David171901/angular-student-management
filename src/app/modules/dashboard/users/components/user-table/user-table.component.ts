import { Component, AfterViewInit, ViewChild, Output, Input, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableDataSourcePaginator } from '@angular/material/table';
import { User } from 'src/app/core/user';
import { UsersService } from 'src/app/services/users.service';
import { UserFormComponent } from '../user-form/user-form.component';
import * as moment from 'moment';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements AfterViewInit {
  res!: User[];
  dataSource! : any;

  constructor(public _dialog: MatDialog, private _usersService: UsersService) {
    this.res = this._usersService.getUsersList();
    this.dataSource = new MatTableDataSource<User>(this._usersService.getUsersList());
  }

  displayedColumns: string[] = ['firstName', 'documentNumber', 'dob', 'email', 'education', 'action'];


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openAddEditUserForm() {
    this._dialog
    .open(UserFormComponent)
    .afterClosed()
    .subscribe({
      next: (v: User) => {
        if (!!v) {
          this.res = [
            {
              ...v,
              dob: moment(v.dob as Date).format('YYYY-MM-DD'),
              id: crypto.randomUUID(),
            },
            ...this.res,
          ];
          this.dataSource = new MatTableDataSource<User>(this.res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      },
    });
  }

  deleteUser(userId: string): void {
    this._dialog
    .open(ConfirmationDialogComponent, {
      data: "¿Estas seguro que deseas eliminar este usuario?"
    })
    .afterClosed()
    .subscribe({
      next: (v: Boolean) => {
        if(v) {
          this.res = this.res.filter((u) => u.id !== userId);
          this.dataSource = new MatTableDataSource<User>(this.res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      },
    });
  }

  editUser(user: User): void {
    this._dialog
      .open(UserFormComponent, {
        data: user,
      })
      .afterClosed()
      .subscribe({
        next: (v) => {
          if (!!v) {
            this.res = this.res.map((u) =>
              u.id === user.id ? { ...u, ...v } : u
            );
            this.dataSource = new MatTableDataSource<User>(this.res);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }
        },
      });
  }
}