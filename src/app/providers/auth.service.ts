import { AuthModel } from './../models/auth.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginModel } from '../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth!: AuthModel;
  constructor(public router: Router,
    public http: HttpClient,
  ) {
    // si esta logedo leavanto el objeto auth
    if (this.loggedIn) {
      this.auth = new AuthModel(localStorage.getItem('email')!, localStorage.getItem('email')!);

    }
  }

  login(login: LoginModel): any {
    this.auth = new AuthModel(login.email, login.email);
    this.loginWriteStorage()
    // const url = `${this._api}app/auth/login`;
    // return this.http.post<GeneralResponse>(url, login)
    //   .pipe(
    //     map((res: any) => {
    //       this.fillAuth(res.data);
    //       this.loginWriteStorage();
    //       return new GeneralResponse('', false, false, res.data);
    //     }),
    //     catchError(err => {
    //       return this.handleError(err);
    //     })
    //   );
  }


  logout(): void {
    localStorage.clear();
    location.reload();
  }

  loginWriteStorage(): void {
    localStorage.setItem('email', this.auth.email);
    localStorage.setItem('token', this.auth.token);
  }

  get loggedIn(): boolean {
    return this.getToken() !== null;
  }

  private getItem(name: string): string {
    return localStorage.getItem(name)!;
  }

  getToken(): string | any {
    const token = this.getItem('token');
    if (token) {
      // return `${this.getItem('tokenType')} ${token}`;
      return token;
    } else {
      return null;
    }
  }
}
