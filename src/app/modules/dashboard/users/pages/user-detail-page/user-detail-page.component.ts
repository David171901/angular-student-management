import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { User } from '../../models';

@Component({
  selector: 'app-user-detail-page',
  templateUrl: './user-detail-page.component.html',
  styleUrls: ['./user-detail-page.component.css']
})
export class UserDetailPageComponent implements OnInit {

  user: User | undefined;

  constructor(private route: ActivatedRoute, private _usersService: UsersService) { }

  ngOnInit() {
    const routeParams = this.route.snapshot.paramMap;
    const userIdFromRoute = routeParams.get('userId');
    console.log("🚀 ~ file: user-detail-page.component.ts:20 ~ UserDetailPageComponent ~ ngOnInit ~ userIdFromRoute:", userIdFromRoute)
    console.log(this._usersService.getUsersList())
    this.user = this._usersService.getUsersList().find((user: any) => user.id === userIdFromRoute);
    console.log(this.user)
  }

}
