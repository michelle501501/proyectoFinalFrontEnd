import { ExperienceModel } from './../models/experience.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {
  public _api = environment.api;

  constructor(public router: Router,
    public http: HttpClient,
  ) { }

  getAll(): Observable<any> {
    const url = `${this._api}explab/lista`;
    return this.http.get<any>(url)
      .pipe(
        map(res => {
          //return new ExperienceModel(res.id, res.nombreE, res.descripcionE);
          return ExperienceModel.createArray(res);

        }),
        catchError(err => {
          // return this.handleError(err);
          //return throwError(err);
          // return throwError(() => new Error('Something bad happened; please try again later.'));
          return throwError(() => err);
        })
      );
  }

  getOne(id:number): Observable<any> {
    const url = `${this._api}explab/detail/${id}`;
    return this.http.get<any>(url)
      .pipe(
        map(res => {
          return ExperienceModel.createOne(res);
        }),
        catchError(err => {
          return throwError(() => err);
        })
      );
  }

  create(data: any): any {
    const url = `${this._api}explab/create`;
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
    const url = `${this._api}explab/update/${id}`;
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
    const url = `${this._api}explab/delete/${id}`;
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
