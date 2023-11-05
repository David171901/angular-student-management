import { Injectable } from '@angular/core';
import * as dataRaw from '../../../../data/courses.json'
import { Observable, of } from 'rxjs';
import { Course } from '../models';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  courses: Course[] = (dataRaw as any).default.data;

  constructor(private _http: HttpClient) { }

  getCourses$(): Observable<any> {
    return this._http.get(`${environment.apiUrl}/courses`);
  }

  getCourseById$(id: string): Observable<any> {
    return this._http.get(`${environment.apiUrl}/courses/${id}`);
  }

  createCourse$(payload: Course): Observable<any> {
    return this._http.post(`${environment.apiUrl}/courses`,payload);
  }

  editCourse$(id: string, payload: Course): Observable<any> {
    return this._http.put(`${environment.apiUrl}/courses/${id}`, payload);
  }
  
  deleteCourse$(id: string): Observable<any> {
    return this._http.delete(`${environment.apiUrl}/courses/${id}`);
  }
}
