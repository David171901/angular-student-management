import { Injectable } from '@angular/core';
import * as dataRaw from '../data/users.json'

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor() { }

  getUsersList() {
    const {data}: any = (dataRaw as any).default;
    return data;
  }
}
