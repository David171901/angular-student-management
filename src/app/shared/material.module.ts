import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {NgIf} from '@angular/common';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatToolbarModule, 
    MatButtonModule, 
    MatIconModule,
    MatSidenavModule, 
    NgIf,
    MatTableModule, 
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  exports: [
    MatToolbarModule, 
    MatButtonModule, 
    MatIconModule,
    MatSidenavModule, 
    NgIf,
    MatTableModule, 
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule,
  ],
})
export class MaterialModule { }
