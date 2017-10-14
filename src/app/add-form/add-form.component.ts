import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { NgbdDatepickerRange } from '../components/datepicker-range/datepicker-range.component';
import { DiscountsService } from '../discounts.service';
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
      category: [null, [Validators.required, Validators.minLength(5)]],
      title: [null, [Validators.required, Validators.minLength(5)]],
      discount: [null, [Validators.required]],
      description: [null, Validators.required],
      isOnline: [true, Validators.required],
      isInPerson: [true, Validators.required],
      isCoupon: [true, Validators.required],
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
      console.log(discount)
      this.discountsService.createDiscounts(discount).subscribe(resDiscount => {
        alert('Success!');
        this.router.navigate(['/home-page']);            
      },
      resLoginError => alert(resLoginError));
    }
  }

  reset() {
    this.userForm.reset();
  }
}
