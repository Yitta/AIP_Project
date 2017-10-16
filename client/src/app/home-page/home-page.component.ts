import { Component, OnInit } from '@angular/core';
import { DiscountsService } from '../services/discounts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})

export class HomePageComponent {
  discounts = [];
  searchQuery;

  activeDiscount;

  constructor(private discountsService: DiscountsService, 
              private router: Router) {}
  
  ngOnInit() {
    this.discountsService.getDiscountList().subscribe(discounts => {
      this.discounts = discounts.discounts;
    });
  }

  selectDiscount(discount) {
    this.router.navigate(['/home-page', discount.id]);
  }

  search(searchQuery){
    this.router.navigate(['/result'], { queryParams: { query: searchQuery } })
  }
}