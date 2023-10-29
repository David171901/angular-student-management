import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { lettersOnlyValidator } from 'src/app/utils/custom-validators';
import { Course } from '../../models';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css']
})
export class CourseFormComponent {
  courseForm: FormGroup;
  areas: string[] = [
    'Seguridad',
    'Diseño',
    'Marketing',
    'Programación y Desarrollo',
    'Inteligencia Artificial',
  ];

  constructor(
    private _fb: FormBuilder,
    public _dialog: MatDialogRef<CourseFormComponent>,
    @Inject(MAT_DIALOG_DATA) public course?: Course
  ) {
    this.courseForm = this._fb.group({
      courseName: ['', [Validators.required, lettersOnlyValidator()]],
      courseDescription: ['', [Validators.required, lettersOnlyValidator()]],
      professor: ['', [Validators.required, lettersOnlyValidator()]],
      area: ['', Validators.required],
      maxStudents: [0, Validators.required],
      startDate: [,Validators.required],
      endDate: [,Validators.required]
    })

    if (this.course) {
      this.courseForm.patchValue(this.course);
    }
  }

  onSubmit(): void {
    if (this.courseForm.invalid) {
      this.courseForm.markAllAsTouched();
    } else {
      console.log(this.courseForm.value)
      this._dialog.close(this.courseForm.value);
    }
  }
}
