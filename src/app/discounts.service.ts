import { Injectable } from '@angular/core';
import { Http, Response ,Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DiscountsService {
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) {}
    
      getDiscounts() {
        return this.http.get('/api/discounts')
                   .map(res => res.json());
      }
    
      saveDiscounts(discount) {
        return this.http.put(`/api/discounts`, discount)
                   .map(res => res.json());
      }

      createDiscounts(discount) {
        return this.http.post(`/api/discounts`, discount, {headers: this.headers})
                   .map(res => res.json());
      }
}