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

  /* User Login function. */
  login(userInfo) {
    return this.http.post(`/api/auth/login`, userInfo, { headers: this.headers })
      .map(res => {
        let user = res.json();
        if (user) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
        return user;
      })
      .catch(this._errorHandler);
  }

  /* User Logout function. */
  logout() {
    return this.http.get(`/api/auth/logout`, { headers: this.headers })
      .map(res => {
        localStorage.removeItem('currentUser');
      })
      .catch(this._errorHandler);
  }

  /* User sign up function. */
  signup(userInfo) {
    return this.http.post(`/api/auth/signup`, userInfo, { headers: this.headers })
      .map(res => res.json())
      .catch(this._errorHandler);
  }

  /* Handle error message. */
  _errorHandler(error: Response) {
    console.error(error);
    return Observable.throw(error || "server error");
  }

  /* sign up as different type account. (need confirm endpoint and data structure)*/
  signupType(userInfo) {
    return this.http.post(`/api/users/signup`, userInfo, { headers: this.headers })
      .map(res => res.json())
      .catch(this._errorHandler);
  }
}