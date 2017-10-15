import { DiscountsService } from './../discounts.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params, ParamMap } from '@angular/router';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  discounts=[];

  constructor(private discountsService: DiscountsService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.activatedRoute.paramMap
    .switchMap((params: ParamMap) => this.discountsService.searchDiscount(+params.get('query')))
    .subscribe(discounts => {
      this.discounts = discounts;
    });
  }

}
