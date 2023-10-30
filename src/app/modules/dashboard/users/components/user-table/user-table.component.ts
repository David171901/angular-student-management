import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableDataSourcePaginator } from '@angular/material/table';
import { UserFormComponent } from '../user-form/user-form.component';
import * as moment from 'moment';
import { UsersService } from '../../services/users.service';
import { User } from '../../models';
import { Observable } from 'rxjs';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css'],
})
export class UserTableComponent implements AfterViewInit {
  res!: User[];
  dataSource!: any;

  constructor(public _dialog: MatDialog, private _usersService: UsersService) {
    this._usersService.getUsers$().subscribe({
      next: (result) => {
        this.dataSource = new MatTableDataSource<User>(result);
      }
    })
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

  openAddUserForm() {
    this._dialog
      .open(UserFormComponent)
      .afterClosed()
      .subscribe({
        next: (v: User) => {
          if (!!v) {
            this._usersService.createUser$({
              ...v,
              dob: moment(v.dob as Date).format('YYYY-MM-DD'),
              id: crypto.randomUUID(),
            }).subscribe({
              next: (result) => {
                this.dataSource = new MatTableDataSource<User>(result);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
              }
            })
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
          if (!!v) {
            this._usersService.deleteUser$(userId).subscribe({
              next: (result) => {
                this.dataSource = new MatTableDataSource<User>(result);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
              },
              // complete: () => {
              //   this._coreService.openSnackBar('Employee detail updated!');
              // }
            })
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
            this._usersService.editUser$(user.id, {
              ...v,
              dob: moment(v.dob as Date).format('YYYY-MM-DD'),
            }).subscribe({
              next: (result) => {
                this.dataSource = new MatTableDataSource<User>(result);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
              }
            })
          }
        },
      });
  }
}