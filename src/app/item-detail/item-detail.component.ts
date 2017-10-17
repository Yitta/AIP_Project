import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CommentFormComponent } from '../components/comment-form/comment-form.component';
import { ActivatedRoute, Router, Params, ParamMap } from '@angular/router';
import { DiscountsService } from '../services/discounts.service';
import { AuthenticationService } from '../services/authentication.service';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})

export class ItemDetailComponent implements OnInit {
  discount;
  accountType = '';
  canEdit = false;

  //collapese state
  public isCollapsed = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private discountsService: DiscountsService,
    private authenticationService: AuthenticationService
  ) { }

  /**
   * get discounet id from discount list
   * then give this id to local itemId
   */
  ngOnInit() {
    this.activatedRoute.paramMap
      .switchMap((params: ParamMap) => this.discountsService.getDiscount(+params.get('id')))
      .subscribe(res => {
        this.discount = res.discount;
        this.canEdit = res.canEdit;
        this.authenticationService.currentUser()
          .subscribe(user => {
            this.accountType = user.accountType;
          });
      });

  }



}