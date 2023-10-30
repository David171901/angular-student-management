import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentsService } from '../../services/students.service';
import { Student } from '../../models';

@Component({
  selector: 'app-user-detail-page',
  templateUrl: './user-detail-page.component.html',
  styleUrls: ['./user-detail-page.component.css']
})
export class UserDetailPageComponent implements OnInit {

  user: Student | undefined;

  constructor(private route: ActivatedRoute, private _StudentsService: StudentsService) { }

  ngOnInit() {
    const routeParams = this.route.snapshot.paramMap;
    const userIdFromRoute = routeParams.get('userId');
    console.log(this._StudentsService.getUsersList())
    this.user = this._StudentsService.getUsersList().find((user: any) => user.id === userIdFromRoute);
    console.log(this.user)
  }

}
