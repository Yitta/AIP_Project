import { Component, OnInit } from '@angular/core';
import { DiscountsService } from '../../discounts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  discounts = [];

  constructor(private discountsService: DiscountsService,
    private router: Router) { }

  ngOnInit() {
    this.discountsService.getDiscountList().subscribe(discounts => {
      this.discounts = discounts.discounts;
    });
  }
  clickDetail(id){
    this.router.navigate(['/home-page', id]);
  }

}
