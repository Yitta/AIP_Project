import { Component, OnInit } from '@angular/core';
import { DiscountsService } from '../discounts.service';

@Component({
  selector: 'app-root',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  discounts = [];

  activeDiscount;

  constructor(private DiscountsService: DiscountsService) { }
  
  ngOnInit() {
    this.DiscountsService.getDiscounts().subscribe(discounts => {
      this.discounts = discounts.discounts;
    });
  }

  selectDiscount(discount) {
    this.activeDiscount = discount;
    console.log(this.activeDiscount);
  }
}