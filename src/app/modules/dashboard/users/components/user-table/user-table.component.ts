import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'documentNumber', 'dob', 'email', 'education', 'action'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

export interface PeriodicElement {
  id: number;
  firstName: string;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {id: 1, firstName: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {id: 2, firstName: 'Helium', weight: 4.0026, symbol: 'He'},
  {id: 3, firstName: 'Lithium', weight: 6.941, symbol: 'Li'},
  {id: 4, firstName: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {id: 5, firstName: 'Boron', weight: 10.811, symbol: 'B'},
  {id: 6, firstName: 'Carbon', weight: 12.0107, symbol: 'C'},
  {id: 7, firstName: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {id: 8, firstName: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {id: 9, firstName: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {id: 10, firstName: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {id: 11, firstName: 'Sodium', weight: 22.9897, symbol: 'Na'},
  {id: 12, firstName: 'Magnesium', weight: 24.305, symbol: 'Mg'},
  {id: 13, firstName: 'Aluminum', weight: 26.9815, symbol: 'Al'},
  {id: 14, firstName: 'Silicon', weight: 28.0855, symbol: 'Si'},
  {id: 15, firstName: 'Phosphorus', weight: 30.9738, symbol: 'P'},
  {id: 16, firstName: 'Sulfur', weight: 32.065, symbol: 'S'},
  {id: 17, firstName: 'Chlorine', weight: 35.453, symbol: 'Cl'},
  {id: 18, firstName: 'Argon', weight: 39.948, symbol: 'Ar'},
  {id: 19, firstName: 'Potassium', weight: 39.0983, symbol: 'K'},
  {id: 20, firstName: 'Calcium', weight: 40.078, symbol: 'Ca'},
];