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
    this.authenticationService.currentUser()
      .subscribe(user => {
        this.currentUser = user;
      });
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
