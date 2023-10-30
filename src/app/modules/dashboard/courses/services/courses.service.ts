import { Injectable } from '@angular/core';
import * as dataRaw from '../../../../data/courses.json'
import { Observable, of } from 'rxjs';
import { Course } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  courses: Course[] = (dataRaw as any).default.data;

  constructor() { }

  getCoursesList() {
    const {data}: any = (dataRaw as any).default;
    return data;
  }

  getCourses$(): Observable<Course[]> {
    return of(this.courses);
  }

  createCourse$(payload: Course): Observable<Course[]> {
    this.courses.push(payload);
    return of([...this.courses]);
  }

  editCourse$(id: string, payload: Course): Observable<Course[]> {
    return of(
      this.courses.map((c) => (c.id === id ? { ...c, ...payload } : c))
    );
  }

  deleteCourse$(id: string): Observable<Course[]> {
    this.courses = this.courses.filter((c) => c.id !== id);
    return of(this.courses);
  }

  getCourseById$(id: string): Observable<Course | undefined> {
    return of(this.courses.find((c) => c.id === id));
  }
}
