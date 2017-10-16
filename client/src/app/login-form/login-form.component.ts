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
        this.router.navigate(['/admin-page'], { queryParams: { list: "user" } });
        window.location.reload();
      } else if(resUserData.accountType == "business" || resUserData.accountType == "student") {
        window.location.reload();
        this.router.navigate(['/home-page']);
      }       
    },
    resLoginError => alert("The username or password you have entered are not correct. Please enter your UniKey details to sign in."));
  }

  getResetEmail(){
    this.authenticationService.getResetEmail().subscribe(res=>alert(res));
  }

}
