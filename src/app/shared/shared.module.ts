import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { TableComponent } from './components/table/table.component';

@NgModule({
  declarations: [
    ToolbarComponent,
    SideBarComponent,
    TableComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [
    MaterialModule,
    ToolbarComponent,
    SideBarComponent,
    TableComponent,
  ]
})
export class SharedModule { }
