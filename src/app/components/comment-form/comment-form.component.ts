import { DiscountsService } from './../../services/discounts.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router, Params, ParamMap } from '@angular/router';

@Component({
  selector: 'comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css']
})
export class CommentFormComponent implements OnInit {
  commentForm: any;
  public isCollapsed = false;

  constructor(private discountsService: DiscountsService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
    //Build form use ngForm
    this.commentForm = {
      currentRate: 5,
      comment: ''
    }
  }

  ngOnInit() {
  }

  submitComment(theForm: NgForm) {
    this.activatedRoute.paramMap
    .switchMap((params: ParamMap) => this.discountsService.createComment(+params.get('id'),theForm.value))
    .subscribe(comments => {
      alert("success!");
    });
  }

}
