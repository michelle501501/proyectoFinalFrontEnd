import { SkillModel } from './../models/skill.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class SkillService {
  public _api = environment.api;

  constructor(public router: Router,
    public http: HttpClient,
  ) { }

  getAll(): Observable<any> {
    const url = `${this._api}hys/lista`;
    return this.http.get<any>(url)
      .pipe(
        map(res => {
          return SkillModel.createArray(res);
        }),
        catchError(err => {
          return throwError(() => err);
        })
      );
  }

  getOne(id:number): Observable<any> {
    const url = `${this._api}hys/detail/${id}`;
    return this.http.get<any>(url)
      .pipe(
        map(res => {
          return SkillModel.createOne(res);
        }),
        catchError(err => {
          return throwError(() => err);
        })
      );
  }

  create(data: any): any {
    const url = `${this._api}hys/create`;
    return this.http.post<any>(url, data)
      .pipe(
        map(res => {
          return res;
        }),
        catchError(err => {
          return throwError(() => err);
        })
      );
  }

  update(id: number, data: any): any {
    const url = `${this._api}hys/update/${id}`;
    return this.http.put<any>(url, data)
      .pipe(
        map(res => {
          return res;
        }),
        catchError(err => {
          return throwError(() => err);
        })
      );
  }

  delete(id: number): any {
    const url = `${this._api}hys/delete/${id}`;
    return this.http.delete<any>(url)
      .pipe(
        map(res => {
          return res;
        }),
        catchError(err => {
          return throwError(() => err);
        })
      );
  }
}
