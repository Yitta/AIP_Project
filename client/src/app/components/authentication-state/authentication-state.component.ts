import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'authentication-state',
  templateUrl: './authentication-state.component.html',
  styleUrls: ['./authentication-state.component.css']
})
export class AuthenticationStateComponent implements OnInit {
  currentState;
  currentUser;
  isAdmin: boolean;
  isBusiness: boolean;

  constructor(private authenticationService: AuthenticationService,
              private router: Router) { }
  
    /**
   * Show different user state based on authentication state
   */
  ngOnInit() {
    if (localStorage.getItem('currentUser')) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      console.log("user：", this.currentUser);
      if (this.currentUser.accountType == "admin") {
        this.isAdmin = true;
      }
      if (this.currentUser.accountType == "business") {
        this.isBusiness = true;
      }
    } else {
      this.currentState = true;
    }
  }

  logout() {
    this.authenticationService.logout().subscribe(resUserData => { });
    window.location.reload();
  }

  clickUsersList() {
    this.router.navigate(['/admin-page'], { queryParams: { list: "user" } })
  }

  clickDiscountsList() {
    this.router.navigate(['/admin-page'], { queryParams: { list: "discount" } })
  }

}
