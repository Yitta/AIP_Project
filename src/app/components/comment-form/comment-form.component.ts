import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css']
})
export class CommentFormComponent implements OnInit {
  commentForm: any;
  public isCollapsed = false;

  constructor() {
    this.commentForm = {
      currentRate: 5,
      comment: ''
    }
  }

  ngOnInit() {
  }

  submitComment(theForm:NgForm){
    console.log(theForm.value);
  }

}
