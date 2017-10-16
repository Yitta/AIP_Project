import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})

export class PasswordResetComponent implements OnInit {
  resetForm: any;
  errorMsg: string;

  constructor(private router: Router,
              private authenticationService: AuthenticationService) {
    this.resetForm = {
      password: '',
      confirmation: ''
    }
  }

  ngOnInit() {
  }

  handleReset(theForm:NgForm){
    var resetInfo = JSON.stringify(theForm.value);
    var password = JSON.parse(resetInfo).password;
    var confirmation = JSON.parse(resetInfo).confirmation;
    if(password != confirmation) {
      alert("Password should match");
      this.resetForm.reset();
    }
    this.authenticationService.resetPassword(resetInfo).subscribe(resUserData => {
      alert('Reset Success!')
      this.router.navigate(['/log-in']);      
    },
    resLoginError => alert(resLoginError));
  }

}
