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
    this.authenticationService.login(userInfo).subscribe(res => {
      console.log("userInfo: ", res);
      console.log("login data", theForm.value);
      if(res.accountType == "admin") {
        console.log("hello, admin");
        this.router.navigate(['/admin-page']);
      } else if(res.accountType == "business" || res.accountType == "student") {
        console.log("hello, other user");
        this.router.navigate(['/home-page']);
      } else {
        alert('Invalid user information!')
      }           
    });

    
    
  }

}
