import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardRoutingModule } from './board-routing.module';
import { BoardPageComponent } from './pages/board-page/board-page.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';


@NgModule({
  declarations: [
    BoardPageComponent
  ],
  imports: [
    CommonModule,
    BoardRoutingModule,
    NgxChartsModule,
  ]
})
export class BoardModule { }
