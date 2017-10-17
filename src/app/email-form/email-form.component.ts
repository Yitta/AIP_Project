import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.css']
})
export class EmailFormComponent implements OnInit {
  emailForm: any;

  constructor(private router: Router,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.emailForm = {
      email: ''
    }
  }

  handleReset(theForm:NgForm){
    var resetInfo = JSON.stringify(theForm.value);
    var password = JSON.parse(resetInfo).password;
    var confirmation = JSON.parse(resetInfo).confirmation;
    if(password != confirmation) {
      alert("Password should match");
    }
    this.authenticationService.getResetEmail(resetInfo).subscribe(resUserData => {
      alert('Already send you an email, please check!')
      this.router.navigate(['/log-in']);      
    },
    resLoginError => alert("Make sure you enter the correct login Email"));
  }

}


