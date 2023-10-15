import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { RouterModule } from '@angular/router';
import { FormErrorsPipe } from './pipe/form-errors.pipe';

@NgModule({
  declarations: [
    ToolbarComponent,
    SideBarComponent,
    FormErrorsPipe,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
  ],
  exports: [
    MaterialModule,
    ToolbarComponent,
    SideBarComponent,
    FormErrorsPipe,
  ]
})
export class SharedModule { }
