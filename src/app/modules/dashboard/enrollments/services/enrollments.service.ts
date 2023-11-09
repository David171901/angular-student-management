import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentsService {
  constructor(private _http: HttpClient) { }

  getEnrollments$(): Observable<any> {
    return this._http.get(`${environment.apiUrl}/enrollments`);
  }

  getEnrollmentById$(id: string): Observable<any> {
    return this._http.get(`${environment.apiUrl}/enrollments/${id}`);
  }

  createEnrollment$(payload: any): Observable<any> {
    return this._http.post(`${environment.apiUrl}/enrollments`,payload);
  }

  editEnrollment$(id: string, payload: any): Observable<any> {
    return this._http.put(`${environment.apiUrl}/enrollments/${id}`, payload);
  }
  
  deleteEnrollment$(id: string): Observable<any> {
    return this._http.delete(`${environment.apiUrl}/enrollments/${id}`);
  }
}
