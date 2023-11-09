import { Injectable } from '@angular/core';
import { Student } from '../models';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  constructor(private _http: HttpClient) { }

  getUsers$(): Observable<any> {
    return this._http.get(`${environment.apiUrl}/students`);
  }

  getUserById$(id: string): Observable<any> {
    return this._http.get(`${environment.apiUrl}/students/${id}`);
  }

  createUser$(payload: Student): Observable<any> {
    return this._http.post(`${environment.apiUrl}/students`,payload);
  }

  editUser$(id: string, payload: Student): Observable<any> {
    return this._http.put(`${environment.apiUrl}/students/${id}`, payload);
  }
  
  deleteUser$(id: string): Observable<any> {
    return this._http.delete(`${environment.apiUrl}/students/${id}`);
  }
}