import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  loginForm: any;
  errorMsg: string;

  constructor(private router: Router,
              private authenticationService: AuthenticationService) {
    this.loginForm = {
      username: '',
      password: ''
    }
  }

  ngOnInit() {
  }

  handleLogin(theForm:NgForm){
    var userInfo = JSON.stringify(theForm.value);
    this.authenticationService.login(userInfo).subscribe(resUserData => {
      console.log("userInfo: ", resUserData);
      console.log("login data", theForm.value);
      if(resUserData.accountType == "admin") {
        this.router.navigate(['/admin-page']);
        window.location.reload();
      } else if(resUserData.accountType == "business" || resUserData.accountType == "student") {
        this.router.navigate(['/home-page']);
        window.location.reload();
      }       
    },
    resLoginError => alert("Invaild Login"));

    
    
  }

}
