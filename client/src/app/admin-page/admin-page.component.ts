import { DiscountsService } from './../discounts.service';
import { AdminService } from './../admin.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params, ParamMap } from '@angular/router';

@Component({
  selector: 'admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  users = [];
  discounts = [];
  showUser: boolean;
  showDiscount: boolean;

  constructor(private adminService: AdminService,
    private discountsService: DiscountsService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(
      params => {
        console.log(params['list'])
        if (params['list'] == "user") {
          this.showUser = true;
          this.showDiscount = false;
          this.discounts = [];
          this.adminService.getUsersList().subscribe(users => {
            this.users = users.users;
          });
        } else {
          this.showDiscount = true;
          this.showUser = false;
          this.users = [];
          this.discountsService.getDiscountList().subscribe(discounts => {
            this.discounts = discounts.discounts;
            console.log(this.discounts)
          });
        }
      }
    )
  }

  getDiscountsList() {
    this.router.navigate(['/admin-page'], { queryParams: { list: "discount" } })
  }

  getUsersList() {
    this.router.navigate(['/admin-page'], { queryParams: { list: "user" } })
  }

  deleteUser(id, i) {
    this.adminService.deleteUser(id).subscribe(res => {
      alert("success!");
      this.users.splice(i, 1);
    })
  }

  deleteDiscount(id, i){
    this.discountsService.deleteDiscount(id).subscribe(res=>{
      alert("success!");
      this.discounts.splice(i, 1);
    })
  }

}
