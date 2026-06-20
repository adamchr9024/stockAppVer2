import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment.development';
import { take, map, catchError, switchMap, } from "rxjs/operators";
import { of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CrudFileService {
  localUrl = 'http://localhost:3000/stock_by_ticker/';
  localUrlCreate = 'http://localhost:3000/create_stock';
  //apiHeader = 'api-key';
  keyvalue = environment.crud_local_api_key;
  headers = new HttpHeaders().set('api-key', `${this.keyvalue}`);

  constructor(private http: HttpClient) { }


  readASecurity(ticker: string) {
    try {
      // this.initalizeheader();
      return this.http.get(this.localUrl + ticker, { headers: this.headers })
        .pipe(switchMap((res) => {
          return of(res)
        }),
          map((x: any) => {
            return x.data;
          }),
          catchError(err => {
            console.error("error caught and rethrown in crudFileService.readASecurity catchError: ", err);
            throw err;
          })
        )
    } catch (err: any) {
      console.error("error caught rethrown in crudFileService.readASecurity  try catch", err?.message);
      throw err;
    }
  }

  createASecurity(body: {}) {
    try {
      if (this.headers.get('content-type')?.toLowerCase().includes('application/json')) {
        console.log("content-type header already exists create");
      }
      else {
        console.log("added application/json header");
        this.headers = this.headers.append('Content-Type', 'application/json'); //must be present otherwise 400 response
      }
      return this.http.post(this.localUrlCreate, body, { headers: this.headers })
        .pipe(take(1),
          map((x: any) => {
            return x;
          }),
          catchError(err => {
            console.error("error caught and rethrown in crudFileService.createASecurity catchError: ", err);
            throw err;
          })
        )
    } catch (err: any) {
      console.error("error caught rethrown in crudFileService.createASecurity try catch", err?.message);
      throw err;
    }
  }
  deleteASecurity(ticker: string) {
    try {
      // this.initalizeheader();
      return this.http.delete(this.localUrl + ticker, { headers: this.headers })
        .pipe(
          switchMap((res) => {
            return of(res);
          }),
          map((x: any) => {
            return x;
          }),
          catchError(err => {
            console.error("error caught and rethrown in crudFileService.deleteASecurity catchError: ", err);
            throw err;
          })
        )
    } catch (err: any) {
      console.error("error caught rethrown in crudFileService.deleteASecurity try catch", err?.message);
      throw err;
    }
  }
  updateASecurity(ticker: string, body: any) {
    // console.log("in crud service update, body=", body)
    try {
      if (this.headers.get('content-type')?.toLowerCase().includes('application/json')) {
        console.log("content-type header already exists update");
      }
      else {
        console.log("added application/json header");
        this.headers = this.headers.append('Content-Type', 'application/json'); //must be present otherwise 400 response
      }
      return this.http.patch(this.localUrl + ticker, body, { headers: this.headers })
        .pipe(take(1),
          map((x: any) => {
            return x;
          }),
          catchError(err => {
            console.error("error caught and rethrown in crudFileService.createASecurity catchError: ", err);
            throw err;
          })
        )
    } catch (err: any) {
      console.error("error caught rethrown in crudFileService.updateASecurity try catch", err?.message);
      throw err;
    }
  }
}


