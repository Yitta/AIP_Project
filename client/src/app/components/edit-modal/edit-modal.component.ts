import { DiscountsService } from './../../discounts.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router, Params, ParamMap } from '@angular/router';

@Component({
  selector: 'edit-modal-content',
  templateUrl: '../../add-form/add-form.component.html',
})
export class NgbdModalContent {
  @Input() userForm;

  constructor(public activeModal: NgbActiveModal,
    private discountsService: DiscountsService,
    private router: Router) { }

  submitForm(discount) {
    if (this.userForm.invalid) {
      alert('Validation errors!')
    } else {
      discount = JSON.stringify(this.userForm.value);
      var id = JSON.parse(discount).id;
      this.discountsService.editDiscount(id, discount).subscribe(resDiscount => {
        alert('success!')
        window.location.reload();       
      },
        resLoginError => alert("Please make sure you have the right permission."));
    }
  }
}

@Component({
  selector: 'edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.css']
})
export class EditModalComponent implements OnInit {
  discount;
  size:"lg";
  constructor(private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private discountsService: DiscountsService) { }

  ngOnInit() {
    this.activatedRoute.paramMap
      .switchMap((params: ParamMap) => this.discountsService.getDiscount(+params.get('id')))
      .subscribe(discount => {
        this.discount = discount;
      });
  }

  open() {
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.userForm = this.formBuilder.group({
      id: [this.discount.id],
      category: [this.discount.category, [Validators.required, Validators.minLength(2)]],
      title: [this.discount.title, [Validators.required, Validators.minLength(2)]],
      discount: [this.discount.discount, [Validators.required]],
      description: [this.discount.description, Validators.required],
      isOnline: [this.discount.isOnline, Validators.required],
      isInPerson: [this.discount.isInPerson, Validators.required],
      isCoupon: [this.discount.isCoupon, Validators.required],
      lat:[this.discount.lat],
      long:[this.discount.long],
      start:[this.discount.start,Validators.required],
      end:[this.discount.end,Validators.required]
    });
  }
}