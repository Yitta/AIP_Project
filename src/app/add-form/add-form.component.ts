import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { NgbdDatepickerRange } from '../components/datepicker-range/datepicker-range.component';
import { DiscountsService } from '../discounts.service';
import { Location } from '@angular/common';

@Component({
    selector: 'add-form',
    templateUrl: './add-form.component.html',
    styleUrls: ['./add-form.component.css']
})
export class AddFormsComponent implements OnInit {
    userForm: FormGroup;
    msg: String;
    changeMsg: any;

    constructor(private formBuilder: FormBuilder, private discountsService: DiscountsService, private location: Location) {}

    ngOnInit() {
        this.userForm = this.formBuilder.group({
            category: ['please enter a Category', [Validators.required, Validators.minLength(5)]],
            title: ['please enter a Name', [Validators.required, Validators.minLength(5)]],
            discount: ['$5 off', [Validators.required, Validators.minLength(6), Validators.maxLength(9)]],
            description: ['please enter the Description', Validators.required],
            isOnline: [true, Validators.required],
            isInPerson: [true, Validators.required],
            isCoupon: [true, Validators.required],
        });


        this.userForm.valueChanges.subscribe(x => this.changeMsg = { event: 'Form DATA CHANGED', object: x });
    }

    logForm(discount) {
        if (this.userForm.invalid) {
            this.msg = 'validation errors!';
            
        } else {
            this.msg = null;
            discount =  JSON.stringify(this.userForm.value);
        
            this.discountsService.createDiscounts(discount).subscribe(discounts => {
                console.log(discounts);            
            });
            console.log(this.userForm.value);
            alert('Success!');
            this.location.back();
        }
    }

    reset() {
        this.userForm.reset();
    }


}
