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

  student: Student | undefined;

  constructor(private route: ActivatedRoute, private _studentsService: StudentsService) { }

  ngOnInit() {
    const routeParams = this.route.snapshot.paramMap;
    const studentIdFromRoute = routeParams.get('studentId');
    if (studentIdFromRoute) {
      this._studentsService.getUserById$(studentIdFromRoute).subscribe({
        next: (result) => {
          if (result) {
            this.student = result;
          }
        },

      })
    }
  }

}
