import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { RouterModule } from '@angular/router';
import { FormErrorsPipe } from './pipe/form-errors.pipe';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { FullNamePipe } from './pipe/full-name.pipe';
import { UppercaseDirective } from './directive/uppercase.directive';

@NgModule({
  declarations: [
    ToolbarComponent,
    SideBarComponent,
    ConfirmationDialogComponent,
    FormErrorsPipe,
    FullNamePipe,
    UppercaseDirective,
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
    ConfirmationDialogComponent,
    FormErrorsPipe,
    FullNamePipe,
    UppercaseDirective,
  ]
})
export class SharedModule { }
