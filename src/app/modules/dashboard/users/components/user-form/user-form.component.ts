import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
      firstName: ['',Validators.required],
      lastName: ['',Validators.required],
      documentNumber: ['',Validators.required],
      dob: ['',Validators.required],
      gender: ['',Validators.required],
      email: ['',Validators.required],
      phoneNumber: ['',Validators.required],
      education: ['',Validators.required],
    })
  }

  onSubmit(): void {
    if (this.userForm.valid){
      console.log('onSubmit')
    }
  }
}
