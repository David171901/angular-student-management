import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { CourseFormComponent } from '../course-form/course-form.component';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import * as moment from 'moment';
import { CoursesService } from '../../services/courses.service';
import { Course } from '../../models';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-course-table',
  templateUrl: './course-table.component.html',
  styleUrls: ['./course-table.component.css']
})
export class CourseTableComponent implements AfterViewInit {
  res!: Course[];
  dataSource!: any;

  constructor(public _dialog: MatDialog, private _coursesService: CoursesService, private snackBar: MatSnackBar) {
    this._coursesService.getCourses$().subscribe({
      next: (result) => {
        this.dataSource = new MatTableDataSource<Course>(result);
      }
    })
  }

  displayedColumns: string[] = ['courseName', 'courseDescription', 'professor', 'area', 'maxStudents', 'action'];

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

  openAddCourseForm() {
    this._dialog
      .open(CourseFormComponent)
      .afterClosed()
      .subscribe({
        next: (v: Course) => {
          if (!!v) {
            this._coursesService.createCourse$({
              ...v,
              startDate: moment(v.startDate as Date).format('YYYY-MM-DD'),
              endDate: moment(v.endDate as Date).format('YYYY-MM-DD'),
              id: crypto.randomUUID(),
            }).subscribe({
              next: (result) => {
                this.dataSource = new MatTableDataSource<Course>(result);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
              },
              complete: () => {
                this.snackBar.open("Curso creado", "", {
                  duration: 1000,
                  verticalPosition: 'bottom',
                });
              }
            })
          }
        },
      });
  }

  deleteCourse(courseId: string): void {
    this._dialog
      .open(ConfirmationDialogComponent, {
        data: "¿Estas seguro que deseas eliminar este curso?"
      })
      .afterClosed()
      .subscribe({
        next: (v: Boolean) => {
          if (v) {
            this._coursesService.deleteCourse$(courseId).subscribe({
              next: (result) => {
                this.dataSource = new MatTableDataSource<Course>(result);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
              },
              complete: () => {
                this.snackBar.open("Curso eliminado", "", {
                  duration: 1000,
                  verticalPosition: 'bottom',
                });
              }
            })
          }
        },
      });
  }

  editCourse(course: Course): void {
    this._dialog
      .open(CourseFormComponent, {
        data: course,
      })
      .afterClosed()
      .subscribe({
        next: (v) => {
          if (!!v) {
            this._coursesService.editCourse$(course.id, v).subscribe({
              next: (result) => {
                this.dataSource = new MatTableDataSource<Course>(result);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
              },
              complete: () => {
                this.snackBar.open("Curso actualizado", "", {
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