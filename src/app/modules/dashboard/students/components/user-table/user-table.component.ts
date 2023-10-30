import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableDataSourcePaginator } from '@angular/material/table';
import { UserFormComponent } from '../user-form/user-form.component';
import * as moment from 'moment';
import { StudentsService } from '../../services/students.service';
import { Student } from '../../models';
import { Observable } from 'rxjs';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css'],
})
export class UserTableComponent implements AfterViewInit {
  dataSource!: any;

  constructor(public _dialog: MatDialog, private _studentsService: StudentsService, private snackBar: MatSnackBar) {
    this._studentsService.getUsers$().subscribe({
      next: (result) => {
        this.dataSource = new MatTableDataSource<Student>(result);
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
        next: (v: Student) => {
          if (!!v) {
            this._studentsService.createUser$({
              ...v,
              dob: moment(v.dob as Date).format('YYYY-MM-DD'),
              id: crypto.randomUUID(),
            }).subscribe({
              next: (result) => {
                this.dataSource = new MatTableDataSource<Student>(result);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
              },
              complete: () => {
                this.snackBar.open("Usuario creado", "", {
                  duration: 1000,
                  verticalPosition: 'bottom',
                });
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
            this._studentsService.deleteUser$(userId).subscribe({
              next: (result) => {
                this.dataSource = new MatTableDataSource<Student>(result);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
              },
              complete: () => {
                this.snackBar.open("Usuario eliminado", "", {
                  duration: 1000,
                  verticalPosition: 'bottom',
                });
              }
            })
          }
        },
      });
  }

  editUser(user: Student): void {
    this._dialog
      .open(UserFormComponent, {
        data: user,
      })
      .afterClosed()
      .subscribe({
        next: (v) => {
          if (!!v) {
            this._studentsService.editUser$(user.id, {
              ...v,
              dob: moment(v.dob as Date).format('YYYY-MM-DD'),
            }).subscribe({
              next: (result) => {
                this.dataSource = new MatTableDataSource<Student>(result);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
              },
              complete: () => {
                this.snackBar.open("Usuario actualizado", "", {
                  duration: 1000,
                  verticalPosition: 'bottom',
                });
              }
            })
          }
        },
      });
  }
}