import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthenticationService {
  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http) { }

  /* Login function. */
  login(userInfo) {
    return this.http.post(`/api/user/login`, userInfo, { headers: this.headers })
      .map(res => res.json());
  }
}