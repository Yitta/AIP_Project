import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { DiscountsService } from '../services/discounts.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css']
})

export class AddFormsComponent implements OnInit {
  userForm: FormGroup;
  msg: String;
  changeMsg: any;

  constructor(private formBuilder: FormBuilder,
              private discountsService: DiscountsService,
              private router: Router,
              private location: Location) {}

  /**
   *  build form with Form Builder.
   *  initial value and validation.
   */
  ngOnInit() {
    this.userForm = this.formBuilder.group({
      category: [null, [Validators.required, Validators.minLength(2)]],
      title: [null, [Validators.required, Validators.minLength(2)]],
      discount: [null, [Validators.required]],
      description: [null, Validators.required],
      isOnline: [false, Validators.required],
      isInPerson: [false, Validators.required],
      isCoupon: [false, Validators.required],
      lat:[null],
      long:[null],
      start:[null,Validators.required],
      end:[null,Validators.required]
    });

    this.userForm.valueChanges.subscribe(x => this.changeMsg = { event: 'Form DATA CHANGED', object: x });
  }

  submitForm(discount) {
    if (this.userForm.invalid) {
      this.msg = 'validation errors!';
      alert('Validation errors!')
    } else {
      this.msg = null;
      discount = JSON.stringify(this.userForm.value);
      this.discountsService.createDiscounts(discount).subscribe(resDiscount => {
        alert('Success!');
        this.router.navigate(['/home-page']);            
      },
      resLoginError => alert("You must be logged in as a business to create discounts."));
    }
  }
}
