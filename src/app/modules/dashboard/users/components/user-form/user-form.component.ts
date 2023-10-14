import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

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

  constructor(private _fb: FormBuilder) {
    this.userForm = this._fb.group({
      firstName: '',
      lastName: '',
      documentNumber: '',
      dob: '',
      gender: '',
      email: '',
      phoneNumber: '',
      education: '',
    })
  }
}
