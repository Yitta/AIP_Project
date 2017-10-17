import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { DiscountsService } from '../services/discounts.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

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

  submitForm(discount:NgForm) {
    if (this.userForm.invalid) {
      this.msg = 'validation errors!';
      alert('Validation errors!')
    } else {
      this.msg = null;
      this.discountsService.createDiscounts(discount.value).subscribe(resDiscount => {
        this.router.navigate(['/home-page/' + resDiscount.id]);            
      },
      resLoginError => alert("You must be logged in as a business to create discounts."));
    }
  }
}
