import { ProfileModel } from './../models/profile.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AboutService {
  public _api = environment.api;

  constructor(public router: Router,
    public http: HttpClient,
  ) { }

  getProfile(): Observable<any> {
    const url = `${this._api}personas/traer/perfil`;
    return this.http.get<any>(url)
      .pipe(
        map(res => {
          return new ProfileModel(res.nombre, res.apellido, res.img, res.puesto, res.bio);
        }),
        catchError(err => {
          // return this.handleError(err);
          //return throwError(err);
          // return throwError(() => new Error('Something bad happened; please try again later.'));
          return throwError(() => err);
        })
      );
  }

  update(data: any): any {
    const url = `${this._api}personas/editar/1`;
    return this.http.put<any>(url, {
      nombre: data.nombre,
      apellido: data.apellido,
      img: data.img,
      puesto: data.puesto,
      bio: data.bio
    })
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
