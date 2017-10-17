import { DiscountsService } from './../../services/discounts.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router, Params, ParamMap } from '@angular/router';
import { CommentListComponent } from '../comment-list/comment-list.component';

@Component({
  providers:[CommentListComponent],
  selector: 'comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css']
})
export class CommentFormComponent implements OnInit {
  commentForm: any;
  public isCollapsed = false;

  constructor(
    private discountsService: DiscountsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private comments: CommentListComponent
  ) {
    //Build form use ngForm
    this.commentForm = {
      rating: 0,
      comment: ''
    }
  }

  ngOnInit() {}

  submitComment(userInput: NgForm) {
    this.activatedRoute.paramMap
      .switchMap((params: ParamMap) => this.discountsService.createComment(+params.get('id'), userInput.value))
      .subscribe(comments => {
        userInput.reset();
        window.location.reload();
      });
  }

  refreshComments() {

  }

}
