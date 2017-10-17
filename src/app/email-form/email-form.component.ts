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

  handleReset(userInput:NgForm){
    var resetInfo = userInput.value;
    this.authenticationService.getResetEmail(resetInfo).subscribe(resUserData => {
      alert('Please check your email!')
      this.router.navigate(['/log-in']);      
    },
    resLoginError => alert("Make sure you enter the correct email."));
  }
}


