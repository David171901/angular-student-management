import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Enrollment } from '../../models';
import { EnrollmentsService } from '../../services/enrollments.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EnrollmentsFormComponent } from '../enrollments-form/enrollments-form.component';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-enrollments-table',
  templateUrl: './enrollments-table.component.html',
  styleUrls: ['./enrollments-table.component.css']
})
export class EnrollmentsTableComponent {
  res!: Enrollment[];
  dataSource!: any;

  constructor(public _dialog: MatDialog, private _enrollmentsService: EnrollmentsService, private snackBar: MatSnackBar) { }

  displayedColumns: string[] = ['studentName', 'studentDocument', 'courseName', 'action'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.getEnrollmentsList()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getEnrollmentsList() {
    this._enrollmentsService.getEnrollments$().subscribe({
      next: (result) => {
        this.dataSource = new MatTableDataSource<Enrollment>(result);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    })
  }

  openAddEnrollmentForm() {
    this._dialog
      .open(EnrollmentsFormComponent)
      .afterClosed()
      .subscribe({
        next: (v: Enrollment) => {
          if (!!v) {
            this._enrollmentsService.createEnrollment$({
              ...v,
              id: crypto.randomUUID(),
            }).subscribe({
              next: () => {
                this.getEnrollmentsList();
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
              },
              complete: () => {
                this.snackBar.open("Estudiante inscrito", "", {
                  duration: 1000,
                  verticalPosition: 'bottom',
                });
              }
            })
          }
        },
      });
  }

  deleteEnrollment(courseId: string): void {
    this._dialog
      .open(ConfirmationDialogComponent, {
        data: "¿Estas seguro que deseas eliminar esta inscripcion?"
      })
      .afterClosed()
      .subscribe({
        next: (v: Boolean) => {
          if (v) {
            this._enrollmentsService.deleteEnrollment$(courseId).subscribe({
              next: () => {
                this.getEnrollmentsList();
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
              },
              complete: () => {
                this.snackBar.open("Inscripcion eliminada", "", {
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
