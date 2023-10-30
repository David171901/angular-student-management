import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { lettersOnlyValidator, phoneNumberValidator } from 'src/app/utils/custom-validators';
import { Student } from '../../models';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {
  userForm: FormGroup;
  education: string[] = [
    'Secundaria',
    'Preparatoria',
    'Bachillerato',
    'Técnico',
    'Licenciatura',
    'Maestría',
    'Doctorado',
    'Otro',
  ];
  maxDate: Date;
  minDate: Date;

  constructor(
    private _fb: FormBuilder, 
    public _dialog: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public user?: Student
  ) {
    const currentYear = new Date().getFullYear();
    this.maxDate = new Date();
    this.minDate = new Date(currentYear - 100, 0, 1);

    this.userForm = this._fb.group({
      firstName: ['David', [Validators.required, lettersOnlyValidator()]],
      lastName: ['Marcelo', [Validators.required, lettersOnlyValidator()]],
      documentNumber: ['74865987', Validators.required],
      dob: [, Validators.required],
      gender: ['male', Validators.required],
      email: ['david.pino@unmsm.edu.pe', [Validators.required, Validators.email]],
      phoneNumber: ['992871521', [Validators.required, phoneNumberValidator()]],
      education: ['', Validators.required],
    })

    if (this.user) {
      this.userForm.patchValue(this.user);
    }
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
    } else {
      this._dialog.close(this.userForm.value);
    }
  }
}
