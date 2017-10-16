import { DiscountsService } from './../discounts.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params, ParamMap } from '@angular/router';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  discounts = [];
  searchQuery;
  notFoundMessage: string;
  showPannel = true;

  constructor(private discountsService: DiscountsService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.discountsService.searchDiscount(params['query']).subscribe(discounts => {
        console.log("res:", discounts);
        if (discounts.discounts.length == 0) {
          this.discounts = [];
          if (params['query'] != "") {
            this.notFoundMessage = "Sorry, no related discount is found...";
          }else{
            this.notFoundMessage = "";
          }
          this.showPannel = true;
        } else {
          this.notFoundMessage = "";
          this.showPannel = false;
          this.discounts = discounts.discounts;
        }
      })
    });
  }

  search(searchQuery) {
    this.router.navigate(['/result'], { queryParams: { query: searchQuery } })
  }

  selectDiscount(discount) {
    this.router.navigate(['/home-page', discount.id]);
  }

}
