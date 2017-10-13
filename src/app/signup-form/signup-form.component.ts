import { AuthenticationService } from './../authentication.service';
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
      email: ''
    }
  }

  ngOnInit() {
  }

  handleSignup(theForm:NgForm){
    var userInfo = JSON.stringify(theForm.value);
    console.log("signup data", theForm.value);
    this.authenticationService.signup(userInfo).subscribe(resUserData => {
      console.log("userInfo: ", resUserData);
      this.router.navigate(['/log-in']);
      // if(resUserData.accountType == "student") {
      //   this.router.navigate(['/home-page']);
      //   window.location.reload();
      // } else if(resUserData.accountType == "business") {
      //   window.location.reload();
      //   this.router.navigate(['/home-page']);
      // }       
    },
    resLoginError => alert(resLoginError));
  }

}
