import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class DiscountsService {
  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http) { }

  /* GET all discounts */
  getDiscountList() {
    return this.http.get(`api/discounts`)
      .map(res => res.json());
  }

  /* POST a new discount. */
  createDiscounts(discount) {
    return this.http.post(`api/discounts`, discount, { headers: this.headers })
      .map(res => res.json());
  }

  /* GET a discount */
  getDiscount(id: number) {
    return this.http.get(`api/discounts/${id}`)
      .map((res: Response) => res.json());
  }

  /* DELETE a discount */
  deleteDiscount(id: number) {
    return this.http.delete(`api/discounts/${id}`)
      .map((res: Response) => res.json());
  }

  /* Edit a discount */
  editDiscount(id, discount) {
    return this.http.put(`api/discounts/${id}`, discount)
      .map(res => res.json());
  }

  /* Search discounts based on query */
  searchDiscount(query) {
    return this.http.get(`api/discounts/search?query=${query}`)
      .map((res: Response) => res.json());
  }

  /* POST a comment to discount. */
  createComment(id,comment) {
    return this.http.post(`api/discounts/${id}/ratings`, comment, { headers: this.headers })
      .map(res => res.json());
  }

  /* GET all comments */
  getCommentList(id) {
    return this.http.get(`api/discounts/${id}/ratings`)
      .map(res => res.json());
  }
}