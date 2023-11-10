import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CoursesService } from './courses.service';
import { environment } from 'src/environments/environment';
import { Course } from '../models';

describe('CoursesService', () => {
  let service: CoursesService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CoursesService],
    });

    service = TestBed.inject(CoursesService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get courses successfully', () => {
    const mockCourses = [    {
      "id": "5b26f5a4-5b57-492b-9a46-825f6440341c",
      "courseName": "Introducción a la Programación",
      "courseDescription": "Aprenda los conceptos básicos de la programación",
      "professor": "John Smith",
      "area": "Programación y Desarrollo",
      "startDate": "2023-11-01",
      "endDate": "2024-03-15",
      "maxStudents": 50
    },
    {
      "id": "6a8d19ec-9362-4f90-96a1-194318e0e15b",
      "courseName": "Desarrollo Web Avanzado",
      "courseDescription": "Aprende a crear aplicaciones web avanzadas",
      "professor": "Maria López",
      "area": "Programación y Desarrollo",
      "startDate": "2023-09-15",
      "endDate": "2024-01-30",
      "maxStudents": 30
    }];

    service.getCourses$().subscribe(courses => {
      expect(courses).toEqual(mockCourses);
    });

    const req = httpTestingController.expectOne(`${environment.apiUrl}/courses`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockCourses);
  });

  it('should get a course by id successfully', () => {
    const courseId = '1';
    const mockCourse = { id: courseId, title: 'Course 1' };

    service.getCourseById$(courseId).subscribe(course => {
      expect(course).toEqual(mockCourse);
    });

    const req = httpTestingController.expectOne(`${environment.apiUrl}/courses/${courseId}`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockCourse);
  });

  it('should create a course successfully', () => {
    const newCourse: Course = {
      "id": "a2cbb0b2-7435-4a7e-af2d-6e1f758b6b59",
      "courseName": "Algoritmos y Estructuras de Datos",
      "courseDescription": "Estudio de algoritmos y estructuras de datos",
      "professor": "Carlos Rodríguez",
      "area": "Programación y Desarrollo",
      "startDate": "2023-10-05",
      "endDate": "2024-02-20",
      "maxStudents": 40
    };

    service.createCourse$(newCourse).subscribe(response => {
      expect(response).toBeTruthy(); 
    });

    const req = httpTestingController.expectOne(`${environment.apiUrl}/courses`);
    expect(req.request.method).toEqual('POST');
    req.flush({}); 
  });

  it('should edit a course successfully', () => {
    const courseId = '1';
    const updatedCourse: Course =  {
      "id": "a2cbb0b2-7435-4a7e-af2d-6e1f758b6b59",
      "courseName": "Algoritmos y Estructuras de Datos",
      "courseDescription": "Estudio de algoritmos y estructuras de datos",
      "professor": "Carlos Rodríguez",
      "area": "Programación y Desarrollo",
      "startDate": "2023-10-05",
      "endDate": "2024-02-20",
      "maxStudents": 40
    };

    service.editCourse$(courseId, updatedCourse).subscribe(response => {
      expect(response).toBeTruthy(); 
    });

    const req = httpTestingController.expectOne(`${environment.apiUrl}/courses/${courseId}`);
    expect(req.request.method).toEqual('PUT');
    req.flush({}); 
  });

  it('should delete a course successfully', () => {
    const courseId = '1';

    service.deleteCourse$(courseId).subscribe(response => {
      expect(response).toBeTruthy(); 
    });

    const req = httpTestingController.expectOne(`${environment.apiUrl}/courses/${courseId}`);
    expect(req.request.method).toEqual('DELETE');
    req.flush({}); 
  });
});
