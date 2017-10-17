import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {
  signupForm: any;

  constructor(private router: Router,
              private authenticationService: AuthenticationService) {
    this.signupForm = {
      username: '',
      password: '',
      accountType: '',
      email: '',
    }
  }

  ngOnInit() {
  }

  handleSignup(theForm:NgForm){
    var userInfo = JSON.stringify(theForm.value);
    this.authenticationService.signup(userInfo).subscribe(resUserData => {
      this.router.navigate(['/log-in']);      
    },
    resLoginError => alert("Try another username, or make sure you use a valid Email."));
  }

}
