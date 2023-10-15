import { Injectable } from '@angular/core';
import * as dataRaw from '../data/courses.json'

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor() { }

  getCoursesList() {
    const {data}: any = (dataRaw as any).default;
    return data;
  }
}
