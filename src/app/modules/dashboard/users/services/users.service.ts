import { Injectable } from '@angular/core';
import * as dataRaw from '../../../../data/users.json'
import { User } from '../models';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  users: User[] = (dataRaw as any).default.data;

  constructor() { }

  getUsersList() {
    const { data }: any = (dataRaw as any).default;
    return data;
  }

  getUsers$(): Observable<User[]> {
    return of(this.users);
  }

  createUser$(payload: User): Observable<User[]> {
    this.users.push(payload);
    return of([...this.users]);
  }

  editUser$(id: string, payload: User): Observable<User[]> {
    return of(
      this.users.map((c) => (c.id === id ? { ...c, ...payload } : c))
    );
  }

  deleteUser$(id: string): Observable<User[]> {
    this.users = this.users.filter((c) => c.id !== id);
    return of(this.users);
  }

  getUserById$(id: string): Observable<User | undefined> {
    return of(this.users.find((c) => c.id === id));
  }
}