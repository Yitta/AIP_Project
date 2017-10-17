import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AdminService {
  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http) { }

  /* DELETE Discount */
  deleteDiscount(id) {
    return this.http.delete(`api/discount/${id}`, { headers: this.headers })
      .map((res: Response) => res.json())
      .catch(this._errorHandler);
  }

  /* DELETE User */
  deleteUser(id) {
    return this.http.delete(`api/users/${id}`, { headers: this.headers })
      .map((res: Response) => res.json())
      .catch(this._errorHandler);
  }

  /* GET all users */
  getUsersList() {
    return this.http.get(`api/users`)
      .map(res => res.json());
  }

  /* Handle error message. */
  _errorHandler(error: Response) {
    console.error(error);
    return Observable.throw(error || "server error");
  }
}