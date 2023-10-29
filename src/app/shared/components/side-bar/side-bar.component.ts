import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent {
  @Input() showSidebar = false;

  constructor(private router: Router, private _cookie: CookieService) {}

  logout () {
    this._cookie.delete('token');
    this.router.navigate(['/','auth']);
  }
}
