import { Injectable } from '@angular/core';
import { Http, Response ,Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class DiscountsService {
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) {}
    
    /* GET all discounts */  
    getDiscountList() {
        return this.http.get('/api/discounts')
                   .map(res => res.json());
      }
    
      saveDiscounts(discount) {
        return this.http.put(`/api/discounts`, discount)
                   .map(res => res.json());
      }

      /* POST a new discount. */
      createDiscounts(discount) {
        return this.http.post(`/api/discounts`, discount, {headers: this.headers})
                   .map(res => res.json());
      }

      /* GET a discount */ 
      getDiscount(id: number) {
        const url = `/api/discounts/${id}`;
        return this.http.get(url)
        .map((res: Response) => res.json());
      }
      
      /* DELETE a discount */
      deleteDiscount(id: number){
        const url = `/api/discounts/${id}`;
        return this.http.delete(url)
        .map((res: Response) => res.json());
      }

      /* PUT edit a discount */
      editDiscount(id: number){
        const url = `/api/discounts/${id}`;
        return this.http.delete(url)
        .map((res: Response) => res.json());
      }
}