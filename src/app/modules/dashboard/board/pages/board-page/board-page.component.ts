import { Component, NgModule, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Subject, forkJoin } from 'rxjs';
import { StudentsService } from '../../../students/services/students.service';
import { CoursesService } from '../../../courses/services/courses.service';

@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.css']
})
export class BoardPageComponent {
  private dataSubject = new Subject<any>();
  single!: any[];
  view: [number, number] = [700, 400];

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };
  cardColor: string = '#232837';
  
  constructor(private _coursesService: CoursesService, private _studentsService: StudentsService) {
    this.getValues().subscribe(result => {
      if (result) {
        this.single = result;
      } else {
        console.error('Error al obtener valores');
      }
    });
  }

  getValues() {
    forkJoin([
      this._coursesService.getCourses$(),
      this._studentsService.getUsers$()
    ]).subscribe(
      ([courses, students]) => {
        console.log('Cursos:', courses);
        this.dataSubject.next([
          {
            "name": "Número de estudiantes",
            "value": students.length
          },
          {
            "name": "Número de cursos",
            "value": courses.length
          },
        ]);
      },
      error => {
        console.error('Error al obtener datos:', error);
        this.dataSubject.next(false);
      }
    );
    return this.dataSubject.asObservable();
  }

  onSelect(event:any) {}
}
