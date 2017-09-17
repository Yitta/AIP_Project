import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  loginForm: any;

  constructor(private router: Router) {
    this.loginForm = {
      username: '',
      password: ''
    }
  }

  ngOnInit() {
  }

  handleLogin(theForm:NgForm){
    console.log("login data", theForm.value);
    if(theForm.value.username == "admin" && theForm.value.password == "admin") {
      console.log("hello, admin");
      this.router.navigate(['/admin-page']);
    } else {
      console.log("hello, other user");
      this.router.navigate(['/home-page']);
    }
    
  }

}
