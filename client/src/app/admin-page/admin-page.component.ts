import { DiscountsService } from '../services/discounts.service';
import { AdminService } from '../services/admin.service';
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
  
    /**
   *  Initialize users or discounts list based on query param
   */
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
          },
          resLoginError => alert("There is something wrong with your permission. Please try login again."));
        } else {
          this.showDiscount = true;
          this.showUser = false;
          this.users = [];
          this.discountsService.getDiscountList().subscribe(discounts => {
            this.discounts = discounts.discounts;
            console.log(this.discounts)
          },
          resLoginError => alert("There is something wrong with your permission. Please try login again."));
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
    },
    resLoginError => alert("Something went wrong, please try later"));
  }

  deleteDiscount(id, i){
    this.discountsService.deleteDiscount(id).subscribe(res=>{
      alert("success!");
      this.discounts.splice(i, 1);
    },
    resLoginError => alert("Something went wrong, please try later"));
  }

}
