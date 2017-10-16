import { DiscountsService } from './../../services/discounts.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params, ParamMap } from '@angular/router';

@Component({
  selector: 'comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {
  comments = [];
  
  constructor(private discountsService: DiscountsService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.activatedRoute.paramMap
    .switchMap((params: ParamMap) => this.discountsService.getCommentList(+params.get('id')))
    .subscribe(comments => {
      this.comments = comments.comments;
    });
  }

}
