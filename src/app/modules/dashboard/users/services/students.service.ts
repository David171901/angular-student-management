import { Injectable } from '@angular/core';
import * as dataRaw from '../../../../data/users.json'
import { Student } from '../models';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  users: Student[] = (dataRaw as any).default.data;

  constructor() { }

  getUsersList() {
    const { data }: any = (dataRaw as any).default;
    return data;
  }

  getUsers$(): Observable<Student[]> {
    return of(this.users);
  }

  createUser$(payload: Student): Observable<Student[]> {
    this.users.push(payload);
    return of([...this.users]);
  }

  editUser$(id: string, payload: Student): Observable<Student[]> {
    return of(
      this.users.map((c) => (c.id === id ? { ...c, ...payload } : c))
    );
  }

  deleteUser$(id: string): Observable<Student[]> {
    this.users = this.users.filter((c) => c.id !== id);
    return of(this.users);
  }

  getUserById$(id: string): Observable<Student | undefined> {
    return of(this.users.find((c) => c.id === id));
  }
}