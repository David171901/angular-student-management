import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { lettersOnlyValidator, phoneNumberValidator } from 'src/app/utils/custom-validators';

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

  constructor(private _fb: FormBuilder, public _dialog: MatDialogRef<UserFormComponent>) {
    const currentYear = new Date().getFullYear();
    this.maxDate = new Date();
    this.minDate = new Date(currentYear - 100, 0, 1);

    this.userForm = this._fb.group({
      firstName: ['', [Validators.required, lettersOnlyValidator()]],
      lastName: ['', [Validators.required, lettersOnlyValidator()]],
      documentNumber: ['', Validators.required],
      dob: [, Validators.required],
      gender: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, phoneNumberValidator()]],
      education: ['', Validators.required],
    })
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
    } else {
      this._dialog.close(this.userForm.value);
    }
  }
}
