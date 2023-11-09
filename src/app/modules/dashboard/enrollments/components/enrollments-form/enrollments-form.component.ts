import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Enrollment } from '../../models';
import { Subject } from 'rxjs';
import { CoursesService } from '../../../courses/services/courses.service';
import { StudentsService } from '../../../students/services/students.service';

@Component({
  selector: 'app-enrollments-form',
  templateUrl: './enrollments-form.component.html',
  styleUrls: ['./enrollments-form.component.css']
})
export class EnrollmentsFormComponent {
  enrollmentForm: FormGroup;
  students: any[] = [];
  courses: any[] = [];
  private dataStudents = new Subject<any>();
  private dataCourses = new Subject<any>();

  constructor(
    private _coursesService: CoursesService,
    private _studentsService: StudentsService,
    private _fb: FormBuilder,
    public _dialog: MatDialogRef<EnrollmentsFormComponent>,
    @Inject(MAT_DIALOG_DATA) public enrollment?: Enrollment,
  ) {
    this.enrollmentForm = this._fb.group({
      studentId: ['', Validators.required],
      courseId: ['', Validators.required],
    })

    if (this.enrollment) {
      this.enrollmentForm.patchValue(this.enrollment);
    }

    this.getStudents();
    this.getCourses();
  }

  onSubmit(): void {
    if (this.enrollmentForm.invalid) {
      this.enrollmentForm.markAllAsTouched();
    } else {
      const student = this.students.filter((student: any) => student.id == this.enrollmentForm.value.studentId)[0];
      const course = this.courses.filter((course: any) => course.id == this.enrollmentForm.value.courseId)[0];
      const result = {
        ...this.enrollmentForm.value,
        studentName: `${student.firstName} ${student.lastName}`,
        studentDocument: student.documentNumber,
        courseName: course.courseName,
      }
      this._dialog.close(result);
    }
  }

  getStudents() {
    this._studentsService.getUsers$().subscribe({
      next: (result) => {
        this.students = result
      }
    })
  }

  getCourses() {
    this._coursesService.getCourses$().subscribe({
      next: (result) => {
        this.courses = result
      }
    })
  }
}
