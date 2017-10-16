import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CommentFormComponent } from '../components/comment-form/comment-form.component';
import { ActivatedRoute, Router, Params, ParamMap } from '@angular/router';
import { DiscountsService } from '../services/discounts.service';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})

export class ItemDetailComponent implements OnInit {
  discount;
  showEdit = false;
  
  //collapese state
  public isCollapsed = true;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private discountsService: DiscountsService) { }

  /**
   * get discounet id from discount list
   * then give this id to local itemId
   */
  ngOnInit() {
    this.activatedRoute.paramMap
      .switchMap((params: ParamMap) => this.discountsService.getDiscount(+params.get('id')))
      .subscribe(discount => {
        this.discount = discount;
        if (this.discount.creatorId == JSON.parse(localStorage.getItem('currentUser')).id || JSON.parse(localStorage.getItem('currentUser')).accountType == 'admin'){
          this.showEdit = true;
        }
      });

  }

  

}