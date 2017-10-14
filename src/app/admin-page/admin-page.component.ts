import { DiscountsService } from './../discounts.service';
import { AdminService } from './../admin.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  users = [];
  discounts = [];

  constructor(private adminService: AdminService,
    private discountsService: DiscountsService) { }

  ngOnInit() {
    this.adminService.getUsersList().subscribe(users => {
      this.users = users.users;
    });
  }

  getDiscounts(){
    this.discountsService.getDiscountList().subscribe(discouts => {
      this.discounts = discouts.discouts;
    })
    this.ngOnInit;
  }

  deleteUser(id){
    this.adminService.deleteUser(id).subscribe(res=>{
      alert(res);
    })
  }

}
