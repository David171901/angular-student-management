import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css']
})
export class AuthPageComponent {
  formLogin: FormGroup = new FormGroup({});
  hide = true;

  constructor(private _authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.formLogin = new FormGroup(
      {
        username: new FormControl('kminchelle',[
          Validators.required,
        ]),
        password: new FormControl('0lelplR',[
          Validators.required,
        ]),
      }
    )
  }

  sendLogin(): void {
    const {username, password} = this.formLogin.value;
    this._authService.sendCredentials(username,password)
      .subscribe(
        res => {
          this.router.navigate(['/', 'board'])
          return 
        },
        err => {
          console.log("🚀 ~ file: login-page.component.ts:36 ~ LoginPageComponent ~ sendLogin ~ err:", err)
          return 
        }
      )

  }
}