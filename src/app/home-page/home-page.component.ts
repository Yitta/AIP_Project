import { Component, OnInit } from '@angular/core';
import { DiscountsService } from '../discounts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})

export class HomePageComponent {
  discounts = [];

  activeDiscount;

  constructor(private DiscountsService: DiscountsService, 
              private router: Router) {}
  
  ngOnInit() {
    this.DiscountsService.getDiscounts().subscribe(discounts => {
      this.discounts = discounts.discounts;
    });
  }

  selectDiscount(discount) {
    this.activeDiscount = discount;
  }
}