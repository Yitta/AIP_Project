import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'authentication-state',
  templateUrl: './authentication-state.component.html',
  styleUrls: ['./authentication-state.component.css']
})
export class AuthenticationStateComponent implements OnInit {
  currentState;
  currentUser;

  constructor(private authenticationService: AuthenticationService,
              private router: Router,) { }

  ngOnInit() {
    if(localStorage.getItem('currentUser')){
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      console.log("user：", this.currentUser);
    }else {
      this.currentState = true;
    }
  }

  logout() {
    this.authenticationService.logout().subscribe(resUserData => {});
    window.location.reload();
  }

}
