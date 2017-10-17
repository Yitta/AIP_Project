import { ActivatedRoute, Router, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})

export class PasswordResetComponent implements OnInit {
  resetForm: any;
  confirm: any;
  errorMsg: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.resetForm = {
      password: '',
      confirm: ''
    }
  }

  ngOnInit() {}

  handleReset(userInput:NgForm){
    this.activatedRoute.params
      .subscribe((params: Params) => {
        var resetBody = userInput.value;
        if(resetBody.password != resetBody.confirm) {
          alert("Passwords do not match.");
          userInput.reset();
        }
        resetBody.token = params.token;
        this.authenticationService.resetPassword(resetBody).subscribe(res => {
          if (res.message !== "Password reset.") {
            alert(res.message)
            userInput.reset();
          }
          alert('Your password has been changed successfully.')
          this.router.navigate(['/log-in']);      
        },
        resLoginError => alert(resLoginError));
      });
  }

}
