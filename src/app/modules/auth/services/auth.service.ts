import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private _http: HttpClient, private _cookie: CookieService, private router: Router ) { }

  sendCredentials(username: string, password: string): Observable<any> {
    const body = {
      username,
      password,
    }
    return this._http.post(`https://dummyjson.com/auth/login`,body).pipe(
      tap((res: any) => {
        const { token } = res;
        this._cookie.set('token', token, 4, '/')
      })
    )
  }

  logout() {
    this._cookie.delete('token');
    this.router.navigate(['/','auth']);
  }
}
