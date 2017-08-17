import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';



@Component({
    selector: 'add-form',
    templateUrl: './add-form.component.html',
    styleUrls: ['./add-form.component.css']
})
export class AddFormsComponent implements OnInit {
    userForm: FormGroup;
    msg: String;
    changeMsg: any;

    constructor(private formBuilder: FormBuilder) {}

    ngOnInit() {
        this.userForm = this.formBuilder.group({
            category: ['please enter a Category', [Validators.required, Validators.minLength(3)]],
            name: ['please enter a Name', [Validators.required, Validators.minLength(3)]],
            discount: ['5%', [Validators.required, Validators.minLength(2), Validators.maxLength(4)]],
            detail: this.formBuilder.group({
                description: ['please enter the Description', Validators.required],
                img: ['URL', Validators.required]
            })
        });
        const detail$ = <FormGroup>this.userForm.controls['detail'];
        const city$ = detail$.controls['description'];
        const street$ = detail$.controls['img'];


        this.userForm.valueChanges.subscribe(x => this.changeMsg = { event: 'Form DATA CHANGED', object: x });
    }

    logForm(NgForm) {
        if (this.userForm.invalid) {
            this.msg = 'validation errors!';
        } else {
            this.msg = null;
        }
        console.log(this.userForm.value);
    }

    reset() {
        this.userForm.reset();
    }
 }
