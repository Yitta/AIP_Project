import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../environments/environment';

@Injectable()
export class DiscountsService {
  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http) { }

  /* GET all discounts */
  getDiscountList() {
    return this.http.get(`${environment.apiBaseUrl}/discounts`)
      .map(res => res.json());
  }

  /* POST a new discount. */
  createDiscounts(discount) {
    return this.http.post(`${environment.apiBaseUrl}/discounts`, discount, { headers: this.headers })
      .map(res => res.json());
  }

  /* GET a discount */
  getDiscount(id: number) {
    const url = `${environment.apiBaseUrl}/discounts/${id}`;
    return this.http.get(url)
      .map((res: Response) => res.json());
  }

  /* DELETE a discount */
  deleteDiscount(id: number) {
    const url = `${environment.apiBaseUrl}/discounts/${id}`;
    return this.http.delete(url)
      .map((res: Response) => res.json());
  }

  /* Edit a discount */
  editDiscount(id, discount) {
    return this.http.put(`${environment.apiBaseUrl}/discounts/${id}`, discount)
    .map(res => res.json());
  }

  /* Search discounts based on query */
  searchDiscount(query) {
    const url = `${environment.apiBaseUrl}/discounts/search?query=${query}`;
    return this.http.get(url)
      .map((res: Response) => res.json());
  }

  /* POST a comment to discount. */
  createComment(id,comment) {
    return this.http.post(`${environment.apiBaseUrl}/discounts/${id}/ratings`, comment, { headers: this.headers })
      .map(res => res.json());
  }

  /* GET all comments */
  getCommentList(id) {
    const getUrl = `${environment.apiBaseUrl}/discounts/${id}/ratings`
    return this.http.get(getUrl)
      .map(res => res.json());
  }
}