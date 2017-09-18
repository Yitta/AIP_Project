import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthenticationService {
  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http) { }

  /* Login function. */
  login(userInfo) {
    return this.http.post(`/api/users/login`, userInfo, { headers: this.headers })
      .map(res => res.json())
      .catch(this._errorHandler);
  }

  _errorHandler(error: Response) {
    console.error(error);
    return Observable.throw(error || "server error");
  }
}