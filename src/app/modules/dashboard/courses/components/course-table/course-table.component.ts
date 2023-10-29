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

@Component({
  selector: 'app-course-table',
  templateUrl: './course-table.component.html',
  styleUrls: ['./course-table.component.css']
})
export class CourseTableComponent implements AfterViewInit {
  res!: Course[];
  dataSource! : any;

  constructor(public _dialog: MatDialog, private _coursesService: CoursesService) {
    this.res = this._coursesService.getCoursesList();
    this.dataSource = new MatTableDataSource<Course>(this.res);
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

  openAddEditUserForm() {
    this._dialog
    .open(CourseFormComponent)
    .afterClosed()
    .subscribe({
      next: (v: Course) => {
        if (!!v) {
          this.res = [
            {
              ...v,
              startDate: moment(v.startDate as Date).format('YYYY-MM-DD'),
              endDate: moment(v.endDate as Date).format('YYYY-MM-DD'),
              id: crypto.randomUUID(),
            },
            ...this.res,
          ];
          this.dataSource = new MatTableDataSource<Course>(this.res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      },
    });
  }

  deleteUser(userId: string): void {
    this._dialog
    .open(ConfirmationDialogComponent, {
      data: "¿Estas seguro que deseas eliminar este curso?"
    })
    .afterClosed()
    .subscribe({
      next: (v: Boolean) => {
        if(v) {
          this.res = this.res.filter((u) => u.id !== userId);
          this.dataSource = new MatTableDataSource<Course>(this.res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      },
    });
  }

  editUser(course: Course): void {
    this._dialog
      .open(CourseFormComponent, {
        data: course,
      })
      .afterClosed()
      .subscribe({
        next: (v) => {
          if (!!v) {
            this.res = this.res.map((u) =>
              u.id === course.id ? { ...u, ...v } : u
            );
            this.dataSource = new MatTableDataSource<Course>(this.res);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }
        },
      });
  }
}